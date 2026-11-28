// Run with Playwright installed, serving the repository through a static HTTP server.
// MAP_URL and BROWSER_PATH can override the default URL and Chromium executable.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve(__dirname, '../reports/authority-screenshots');
const shift = (s,n) => new Date(Date.parse(s) + 86400000*n).toISOString().slice(0,10);
function firstDay(s) { return s.length === 4 ? s+'-01-01' : s.length === 7 ? s+'-01' : s; }

async function main() {
  const browser = await chromium.launch({executablePath:process.env.BROWSER_PATH || undefined});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:960}, deviceScaleFactor:1});
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(process.env.MAP_URL || 'http://127.0.0.1:8417/', {waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => window.authorityRecords?.length && window.customPolygons?.length);
    const records = await page.evaluate(() => window.authorityRecords);
    const regions = [...new Set(records.map(r=>r.region))];
    const shapeRecords = records.filter(r=>r.point||r.ring);
    const boundaries = [...new Set(records.flatMap(r=>[r.from,r.until]).filter(Boolean).map(firstDay))];
    const dates = [...new Set(['1500-01-01','1600-01-01','1665-03-09','1700-12-31',
      ...Array.from({length:201},(_,i)=>String(1500+i)+'-01-01'), ...boundaries.flatMap(s=>[shift(s,-1),s])])].filter(s=>s>='1500-01-01'&&s<='1700-12-31').sort();
    const setDate = async date => {
      await page.locator('#map-date').fill(date);
      assert.equal(await page.locator('#map-date').inputValue(),date);
    };
    // Exercise the actual range input and check all transition dates in both directions.
    for (const days of [dates, dates.slice().reverse()]) {
      const result = await page.evaluate(days => {
        const failures = [];
        for (const day of days) {
          const slider = document.querySelector('#map-day');
          slider.value = (Date.parse(day)-Date.parse('1500-01-01')) / 86400000;
          slider.dispatchEvent(new Event('input', {bubbles:true}));
          const active = window.authorityRecords.filter(r=>day>=r.from && (!r.until || day<r.until));
          const painted = document.querySelectorAll('path.authority-shape');
          const expectedNames = active.filter(r=>r.point || r.ring).map(r=>r.status + '|' + r.name).sort();
          const actualNames = [];
          map.eachLayer(layer => {
            if (layer.options?.className?.startsWith('authority-shape')) {
              actualNames.push(layer.options.className.split('authority-').at(-1) + '|' + layer.getTooltip().getContent().textContent);
            }
          });
          if (String(actualNames.sort()) !== String(expectedNames)) failures.push([day,'layer identities']);
          if (dateField.value !== day || painted.length !== active.filter(r=>r.point||r.ring).length)
            failures.push([day, 'paint', painted.length,active.filter(r=>r.point||r.ring).length]);
          for (const r of new Set(window.authorityRecords.map(r=>r.region))) {
            if (!active.some(a=>a.region===r)) failures.push([day, 'regional gap',r]);
          }
        }
        return failures;
      },days);
      assert.deepEqual(result,[]);
    }
    // Check the regional reader as well as SVG. Context-only entries (especially
    // those beyond the registered coast) must switch at both ends of each range.
    const regionChecks = await page.evaluate(() => {
      let checks = 0;
      const panel = document.querySelector('.authority-panel');
      panel.open = true;
      const picker = panel.querySelector('select');
      for (const region of [...new Set(authorityRecords.map(r=>r.region))]) {
        const rows = authorityRecords.filter(r=>r.region === region);
        const days = new Set(['1500-01-01','1700-12-31','1665-03-09']);
        for (const r of rows) {
          for (const date of [r.from,r.until].filter(Boolean)) {
            const first = date.length === 4 ? date+'-01-01' : date.length === 7 ? date+'-01' : date;
            days.add(first);
            days.add(new Date(Date.parse(first)-86400000).toISOString().slice(0,10));
          }
        }
        picker.value = region; picker.dispatchEvent(new Event('change'));
        for (const day of [...days].sort().filter(d=>d>='1500-01-01' && d<='1700-12-31')) {
          daySlider.value = (Date.parse(day)-firstDay)/dayMs;
          daySlider.dispatchEvent(new Event('input'));
          const expected = rows.filter(r=>day>=r.from && (!r.until||day<r.until)).map(r=>r.name+'|'+r.url).sort();
          const seen = [...panel.querySelectorAll('article')].map(el=>el.querySelector('strong').textContent+'|'+el.querySelector('a').getAttribute('href')).sort();
          if (expected.join('\n') !== seen.join('\n')) throw Error(region+' reader mismatch '+day);
          checks++;
        }
      }
      picker.value = ''; picker.dispatchEvent(new Event('change'));
      return checks;
    });
    assert(records.every(r => stylesKnown(r) && r.from && r.name && r.detail && /^https?:\/\//.test(r.url)));
    const camera = async (xy,z) => {
      await page.evaluate(([xy,z]) => {map.closePopup();map.setView(map.unproject(xy,5),z,{animate:false});},[xy,z]);
      await page.waitForTimeout(300);
    };
    const screenPoint = xy => page.evaluate(xy => {
      const p = map.latLngToContainerPoint(map.unproject(xy,5));
      return [p.x,p.y];
    },xy);
    const pixel = async xy => {
      const [x,y] = await screenPoint(xy);
      return page.screenshot({clip:{x,y,width:1,height:1}});
    };
    const clickLand = async xy => {
      const pos = await screenPoint(xy);
      await page.mouse.click(...pos);
    };
    fs.mkdirSync(out,{recursive:true});
    const shot = async file => { await page.waitForTimeout(250); await page.screenshot({path:path.join(out,file+'.png')}); };
    await camera([4070,4110],2);
    await setDate('1500-01-01'); await shot('1500-full-sheet');
    await setDate('1600-01-01'); await camera([4570,5200],3); await shot('1600-southern-homelands');
    await setDate('1624-07-01'); await camera([429,7232],6); await clickLand([429,7232]);
    assert((await page.locator('.authority-popup').innerText()).includes('Nutten Island'));
    await shot('1624-pagganck');
    await setDate('1637-06-04'); await camera([4020,5590],5); await shot('1637-pequot-country');
    await setDate('1665-03-09'); await camera([4250,5030],3); await shot('1665-03-09-southern-region');
    await camera([436,7194],6);
    for (const [date, name] of [['1664-09-07','New Amsterdam'],['1664-09-08','New York'],['1665-03-09','New York'],['1673-08-08','New York'],['1673-08-09','New Orange'],['1674-11-09','New Orange'],['1674-11-10','New York']]) {
      await setDate(date);
      await clickLand([434,7195]);
      const popup = page.locator('.authority-popup');
      assert((await popup.innerText()).includes(name),date+' expected '+name);
      const link=popup.locator('a[href^="http"]').first();
      assert(await link.isVisible());
      if (date==='1673-08-09') await shot('1673-new-orange');
      await page.evaluate(()=>map.closePopup());
    }
    await setDate('1673-08-22'); await camera([3230,6540],4); await shot('1673-long-island-townships');
    await setDate('1665-03-09'); await camera([4600,3170],4); await shot('1665-massachusetts-interior');
    await camera([5296,4970],5);
    for (const [day,text] of [['1676-08-21','Pokanoket and Plymouth'],['1676-08-22','Competing colonial claims'],['1676-08-21','Pokanoket and Plymouth']]) {
      await setDate(day); await clickLand([5296,4970]);
      assert((await page.locator('.authority-popup').innerText()).includes(text));
      if (day === '1676-08-22') await shot('1676-mount-hope');
      await page.evaluate(()=>map.closePopup());
    }
    await setDate('1700-12-31'); await camera([4070,4110],2); await shot('1700-full-sheet');
    await setDate('1672-06-01'); await camera([4750,6175],6); await clickLand([4752,6190]);
    const overlap = await page.locator('.authority-popup').innerText();
    assert(overlap.includes('New Shoreham') && overlap.includes('Manissean community'));
    await page.evaluate(()=>map.closePopup());
    await page.locator('.authority-popup').waitFor({state:'detached'});
    // Exercise the land-mask lookup even when another visible overlay owns
    // the pointer event at the offshore pixel.
    await page.evaluate(()=>map.fire('click',{latlng:map.unproject([4650,6190],5)}));
    assert(!(await page.locator('.authority-popup').innerText()).includes('New Shoreham'));
    assert(await page.locator('mask#main-political-land image').count());
    await page.evaluate(()=>map.closePopup());
    const toggle=page.locator('.leaflet-control-layers label').filter({hasText:'Political authority at selected date'}).locator('input');
    const layerControl=page.locator('.leaflet-control-layers');
    await layerControl.hover();
    const paintedLand = await pixel([4752,6190]);
    const maskedWater = await pixel([4760,6120]); // inside the Manisses envelope, off its shore
    await toggle.uncheck(); assert.equal(await page.locator('.authority-shape').count(),0);
    assert(!(await pixel([4752,6190])).equals(paintedLand),'political paint on land');
    assert((await pixel([4760,6120])).equals(maskedWater),'water retained its basemap color');
    await toggle.check(); assert(await page.locator('.authority-shape').count()>0);
    await page.mouse.move(720,480);
    const reference = page.locator('.leaflet-control-layers label').filter({hasText:'Historical homeland sketches'}).locator('input');
    await layerControl.hover(); await reference.check();
    assert(await page.evaluate(()=>map.hasLayer(territoryMarkersLayer)));
    await reference.uncheck(); await page.mouse.move(720,480);
    if (await page.locator('.authority-panel').getAttribute('open') === null) await page.locator('.authority-panel summary').click();
    for (const r of regions) {
      await page.getByLabel('Regional political evidence').selectOption(r);
      assert(await page.locator('.authority-panel article a').count()>0,r);
    }
    await page.getByLabel('Regional political evidence').selectOption('Maine');
    await setDate('1665-07-03');
    assert((await page.locator('.authority-panel').innerText()).includes('Royal commissioners at York'));
    await camera([6350,1620],3); await shot('1665-york-commission');
    for (const [day,region,xy,term,file] of [
      ['1680-07-01','New Hampshire',[5450,1500],'Province of New Hampshire','1680-piscataqua'],
      ['1690-07-01','Northern edge',[3050,1120],'Western Abenaki','1690-northern-edge'],
    ]) {
      await setDate(day); await page.getByLabel('Regional political evidence').selectOption(region);
      assert((await page.locator('.authority-panel').innerText()).includes(term));
      await camera(xy,3); await shot(file);
    }
    await setDate('1665-07-03');
    await page.locator('#timeline-play').click(); await page.waitForTimeout(450); await page.locator('#timeline-play').click();
    assert((await page.locator('#map-date').inputValue())>'1665-07-03');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({records:records.length,shapes:shapeRecords.length,regions:regions.length,
      regionChecks,boundaryDates:dates.length,totalSliderChecks:2*dates.length,screenshots:fs.readdirSync(out).length,errors},null,2));
  } finally { await browser.close(); }
}
function stylesKnown(r) { return ['indigenous','english','dutch','french','claim','contested','unresolved'].includes(r.status); }
main().catch(e=>{console.error(e);process.exitCode=1});
