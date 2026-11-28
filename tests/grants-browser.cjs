// Run against the repository's static server with Playwright and BROWSER_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

async function main() {
  const browser = await chromium.launch({executablePath: process.env.BROWSER_PATH || undefined});
  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 960}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.MAP_URL || 'http://127.0.0.1:8417/', {waitUntil: 'domcontentloaded'});
    await page.waitForFunction(() => window.authorityRecords?.length && window.customPolygons?.length);
    const cases = [
      ['1630-03-22', 'Hilton’s Point patent (Wecanacohunt, Dover Neck)', 'inventory'],
      ['1624-01-11', 'Cape Ann • Sheffield patent', 'point'],
      ['1672-08-04', 'Sophy Manor • disputed Prudence Island patent', 'ring'],
      ['1685-10-27', 'Rombout Patent (Rumbout) • eastern Hudson bank', 'inventory']
    ];
    await page.locator('.authority-panel').evaluate(panel => { panel.open = true; });
    for (const [day, name, geometry] of cases) {
      const record = await page.evaluate(name => authorityRecords.find(r => r.name === name), name);
      assert.ok(record, name);
      assert.equal(record.ring ? 'ring' : record.point ? 'point' : 'inventory', geometry);
      const yesterday = new Date(Date.parse(day) - 86400000).toISOString().slice(0,10);
      await page.getByLabel('Regional political evidence').selectOption(record.region);
      for (const [date, expected] of [[yesterday, false], [day, true], [yesterday, false]]) {
        await page.locator('#map-date').fill(date);
        const title = page.locator('.authority-panel article strong').getByText(name, {exact: true});
        assert.equal(await title.count(), Number(expected), name + ' ' + date);
        if (expected) {
          const href = await title.locator('..').locator('a').getAttribute('href');
          assert.equal(href, record.url);
        }
        const visible = await page.evaluate(name => {
          let found = false;
          map.eachLayer(l => {
            if (l.options?.className?.startsWith('authority-shape') && l.getTooltip()?.getContent().textContent === name) found = true;
          });
          return found;
        }, name);
        assert.equal(visible, expected && geometry !== 'inventory');
      }
    }
    await page.locator('#map-date').fill('1672-08-04');
    await page.locator('.authority-panel').evaluate(panel => { panel.open = false; });
    await page.evaluate(() => map.setView(map.unproject([5195,5160],5),6,{animate:false}));
    await page.waitForTimeout(350);
    async function clickAt(x,y) {
      const p = await page.evaluate(([x,y]) => {
        const p = map.latLngToContainerPoint(map.unproject([x,y],5));
        const rect = map.getContainer().getBoundingClientRect();
        return [rect.left+p.x, rect.top+p.y];
      },[x,y]);
      await page.mouse.click(...p);
    }
    await clickAt(5195,5160);
    assert.match(await page.locator('.authority-popup').innerText(), /Sophy Manor/);
    await page.evaluate(() => map.closePopup());
    await page.locator('.authority-popup').waitFor({state:'detached'});
    await clickAt(5250,5160);
    // A separately enabled historical sketch can receive the offshore click.
    assert.doesNotMatch(await page.locator('.leaflet-popup').innerText(), /Sophy Manor/);
    const control = page.locator('.leaflet-control-layers');
    await control.hover();
    const toggle = control.locator('label').filter({hasText:'Political authority at selected date'}).locator('input');
    await toggle.uncheck();
    assert.equal(await page.locator('.authority-shape').count(),0);
    await toggle.check();
    assert.ok(await page.locator('.authority-shape').count());
    const sketches = control.locator('label').filter({hasText:'Historical homeland sketches'}).locator('input');
    await sketches.check();
    assert.ok(await page.evaluate(() => map.hasLayer(territoryMarkersLayer)));
    await sketches.uncheck();
    assert.deepEqual(errors, []);
    console.log('Grant dates, regional entries, source anchors, geometry, coastal clicks and layer toggles passed.');
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
