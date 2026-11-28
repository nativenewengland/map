// Dates use Gregorian civil days. Partial dates switch at the start of their
// recorded period; the displayed precision stays that of the source.
{
  const records = window.authorityRecords;
  const styles = {
    indigenous: ['Indigenous authority', '#176346'],
    english: ['English administration', '#b32932'],
    dutch: ['Dutch administration', '#c15c0a'],
    french: ['French administration', '#335b9b'],
    contested: ['Contested or shared authority', '#713d88', '5 3'],
    claim: ['Claim or grant', '#885a23', '2 4'],
    unresolved: ['Extent unresolved', '#59616a', '1 4'],
  };
  const sites = new Map();
  const group = L.layerGroup().addTo(territoriesOverlay);
  const regions = [...new Set(records.map(r => r.region))].sort();
  let current = [];
  let selectedPoint;
  let selectedRecord;
  let date;
  let lastInterval;
  const boundaries = [...new Set(records.flatMap(r => [r.from, r.until]).filter(Boolean))].sort();
  const control = L.control({position: 'topleft'});
  const panel = document.createElement('details');
  panel.className = 'authority-panel';
  const title = document.createElement('summary');
  title.textContent = 'Political authority';
  title.title = 'View legend and regional evidence';
  const legend = document.createElement('div');
  legend.className = 'authority-legend';
  for (const [label, color, dash] of Object.values(styles)) {
    const line = document.createElement('span');
    line.style.setProperty('--ink', color);
    if (dash) line.className = 'dashed';
    line.textContent = label;
    legend.append(line);
  }
  const help = document.createElement('p');
  help.textContent = 'Dots locate sites. Unshaded land has no reconstructed boundary for this date. Click land for evidence. Year and month transitions use the first day of the recorded period.';
  const picker = document.createElement('select');
  picker.setAttribute('aria-label', 'Regional political evidence');
  picker.add(new Option('Choose a region', ''));
  for (const region of regions) picker.add(new Option(region, region));
  const inventory = document.createElement('div');
  panel.append(title, legend, help, picker, inventory);
  panel.open = window.innerWidth >= 1000;
  control.onAdd = () => panel;
  control.addTo(map);
  L.DomEvent.disableClickPropagation(panel);
  L.DomEvent.disableScrollPropagation(panel);

  function evidence(r) {
    const article = document.createElement('article');
    const heading = document.createElement('strong');
    heading.textContent = r.name;
    const meta = document.createElement('small');
    meta.textContent = styles[r.status][0] + ' · ' + r.from + ' to ' + (r.until ? 'before ' + r.until : 'timeline end');
    const detail = document.createElement('p');
    detail.textContent = r.detail;
    if (r.from.length < 10 || (r.until && r.until.length < 10)) {
      meta.title = 'Year and month transitions display from the first day of the recorded period.';
    }
    const source = document.createElement('a');
    source.textContent = 'Source · ' + new URL(r.url).hostname;
    source.href = r.url;
    source.target = '_blank';
    source.rel = 'noopener';
    article.append(heading, meta, detail, source);
    if (r.regionalLocation) {
      const [lon, lat] = r.regionalLocation;
      const link = document.createElement('a');
      link.textContent = ' Locate vicinity on the regional map';
      link.href = '1/?' + new URLSearchParams({lon, lat, grant: r.name});
      article.append(link);
    }
    if (r.from !== '1500' && r.from.length < 10 && date.startsWith(r.from)) {
      const precision = document.createElement('p');
      precision.className = 'authority-precision';
      precision.textContent = 'Evidence begins in ' + r.from + '. The exact day within that ' +
        (r.from.length === 4 ? 'year' : 'month') + ' is unresolved.';
      article.append(precision);
    }
    return article;
  }
  function updateInventory() {
    inventory.replaceChildren();
    if (!picker.value || !panel.open) return;
    for (const r of current.filter(r => r.region === picker.value).sort((a,b) => b.from.localeCompare(a.from))) inventory.append(evidence(r));
  }
  picker.onchange = updateInventory;
  panel.ontoggle = updateInventory;

  function inside(p, ring) {
    let hit = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x,y] = ring[i], [u,v] = ring[j];
      if ((y > p.y) !== (v > p.y) && p.x < (u-x)*(p.y-y)/(v-y)+x) hit = !hit;
    }
    return hit;
  }
  // This nearest-locality index selects reading material, never a polity.
  const anchors = records.flatMap(r => {
    if (!r.point && !r.ring) return [];
    return [{region: r.region, point: r.point || r.ring[0]}];
  });
  // These index positions are reading guides in areas where the main artwork
  // lacks locatable rivers. They aren't encoded as political features.
  const guides = [
    ['Northern edge', 3050, 1120], ['New Hampshire', 5270, 1620],
    ['Maine', 6820, 1180], ['Hudson Valley and Manhattan', 1050, 2330],
  ];
  for (const [region, x, y] of guides) {
    anchors.push({region, point:[x,y]});
    const label = L.marker(map.unproject([x,y],5), {
      icon: L.divIcon({className:'authority-guide', html:'Regional evidence<br><b>' + region + '</b>', iconSize:[110,34]}),
      title:'Read regional evidence for ' + region,
    }).addTo(group);
    label.on('click', () => {
      picker.value = region;
      panel.open = true;
      updateInventory();
    });
  }
  const mask = new Image();
  mask.src = 'hydro/territory-mask.png';
  const sampler = document.createElement('canvas');
  sampler.width = sampler.height = 1;
  const ctx = sampler.getContext('2d', {willReadFrequently:true});
  function isLand(p) {
    if (!mask.naturalWidth) return false;
    ctx.drawImage(mask, Math.floor(p.x), Math.floor(p.y), 1, 1, 0, 0, 1, 1);
    return ctx.getImageData(0,0,1,1).data[0] >= 128;
  }

  // Archived sketches index nearby evidence only. They never enter the dated
  // features or the test for political authority at a selected location.
  const referenceIndex = new WeakMap();
  function nearbySketches(p) {
    return customPolygons.filter(record => {
      if (record.overlay !== 'Territories') return false;
      if (!referenceIndex.has(record)) {
        const points = record.coords.map(coord => map.project(coord, 5));
        referenceIndex.set(record, {bounds:L.bounds(points), ring:points.map(v => [v.x,v.y])});
      }
      const shape = referenceIndex.get(record);
      return shape.bounds.contains(p) && inside(p, shape.ring);
    });
  }
  function referenceNotes(p) {
    const sketches = nearbySketches(p);
    if (!sketches.length) return null;
    const notes = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Earlier map interpretations (' + sketches.length + ')';
    notes.append(summary);
    for (const sketch of sketches) {
      const name = document.createElement('strong');
      name.textContent = sketch.name;
      const paragraph = document.createElement('p');
      const source = new DOMParser().parseFromString(sketch.description, 'text/html');
      paragraph.textContent = source.body.textContent;
      const link = source.querySelector('a[href^="https://"]');
      notes.append(name, paragraph);
      if (link) {
        const anchor = document.createElement('a');
        anchor.textContent = link.textContent;
        anchor.href = link.href;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        notes.append(anchor);
      }
    }
    return notes;
  }
  const popup = L.popup({maxHeight: 280, maxWidth: 340, className:'authority-popup', autoPan:false});
  function inspect(position, selected) {
    const p = map.project(position, 5);
    if (!artworkBounds.contains(position)) return;
    const onLand = isLand(p);
    const local = current.filter(r => r === selected || (onLand && r.ring && inside(p, r.ring)) ||
      (r.point && map.latLngToContainerPoint(position).distanceTo(map.latLngToContainerPoint(map.unproject(r.point,5))) <= 5));
    const section = document.createElement('section');
    const header = document.createElement('b');
    header.textContent = dateField.value;
    section.append(header);
    if (local.length > 1) {
      const note = document.createElement('p');
      note.textContent = 'Areas and localities at this position';
      section.append(note);
    }
    if (local.length) {
      for (const r of local) section.append(evidence(r));
    } else {
      const message = document.createElement('p');
      message.textContent = onLand ? 'Local political boundary unresolved at this date.' : 'Outside the registered land mask. The main artwork includes water, unregistered land and locator insets.';
      section.append(message);
    }
    if (anchors.length) {
      const nearest = anchors.reduce((a,b) => p.distanceTo(a.point) <= p.distanceTo(b.point) ? a : b);
      const region = selected?.region || local[0]?.region || nearest.region;
      const btn = document.createElement('button');
      btn.textContent = 'Regional evidence · ' + region;
      btn.onclick = () => { picker.value = region; panel.open = true; updateInventory(); map.closePopup(popup); };
      section.append(btn);
      if (!local.length) {
        const notes = onLand && referenceNotes(p);
        if (notes) section.append(notes);
        for (const r of current.filter(r => r.region === region && !r.point && !r.ring)) section.append(evidence(r));
      }
    }
    selectedPoint = position;
    selectedRecord = selected;
    popup.setLatLng(position).setContent(section).openOn(map);
  }
  for (const r of records) {
    if (r.from.length === 10) registerTimelineNews(r.from, r.name + ' — ' + r.detail, r.url);
    if (!r.point && !r.ring) continue;
    const [,color,dashArray] = styles[r.status];
    const options = {color, dashArray, weight: 2, fillColor:color, fillOpacity:r.point ? .88 : .26,
      smoothFactor:0, bubblingMouseEvents:false, className:'authority-shape authority-' + r.status};
    if (r.ring && ['indigenous','contested','claim'].includes(r.status)) {
      options.fillColor = 'url(#political-' + r.status + ')';
      options.fillOpacity = .66;
    }
    const layer = r.ring
      ? L.polygon(r.ring.map(p => map.unproject(p,5)), {...options,renderer:politicalAreaRenderer})
      : L.circleMarker(map.unproject(r.point,5), {...options, renderer:politicalSiteRenderer, radius:5});
    const label = document.createElement('span');
    label.textContent = r.name;
    layer.bindTooltip(label);
    layer.on('click', e => inspect(e.latlng, r.point ? r : undefined));
    sites.set(r, layer);
  }
  map.on('click', e => { if (map.hasLayer(territoriesOverlay)) inspect(e.latlng); });
  function refresh(next) {
    const previousMonth = date?.slice(0,7);
    date = next;
    const index = boundaries.findIndex(b => b > date);
    if (index !== lastInterval) {
      lastInterval = index;
      current = records.filter(r => date >= r.from && (!r.until || date < r.until));
      const active = new Set(current);
      for (const [r,layer] of sites) {
        if (active.has(r) && !group.hasLayer(layer)) group.addLayer(layer);
        if (!active.has(r) && group.hasLayer(layer)) group.removeLayer(layer);
      }
      updateInventory();
    } else if (previousMonth !== next.slice(0,7)) {
      updateInventory();
    }
    if (map.hasLayer(popup) && selectedPoint) inspect(selectedPoint, current.includes(selectedRecord) ? selectedRecord : undefined);
  }
  map.on('overlayremove', e => {
    if (e.layer === territoriesOverlay) { map.closePopup(popup); panel.hidden = true; }
  });
  map.on('overlayadd', e => { if (e.layer === territoriesOverlay) panel.hidden = false; });
  document.addEventListener('mapdatechange', e => refresh(e.detail));
  refresh(dateField.value);
}
