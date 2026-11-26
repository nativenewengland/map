// Project original longitude/latitude placements to the registered terrain sheet.
// NAD83 / North America Albers with standard parallels at 20 and 60 degrees.
export function polityPoint([longitude, latitude]) {
  const rad = Math.PI / 180;
  const flattening = 1 / 298.257222101;
  const e = Math.sqrt(2 * flattening - flattening ** 2);
  function q(degrees) {
    const s = Math.sin(degrees * rad);
    return (1 - e * e) * (s / (1 - (e * s) ** 2) - Math.log((1 - e * s) / (1 + e * s)) / (2 * e));
  }
  function m2(degrees) {
    return Math.cos(degrees * rad) ** 2 / (1 - (e * Math.sin(degrees * rad)) ** 2);
  }
  const n = (m2(20) - m2(60)) / (q(60) - q(20));
  const c = m2(20) + n * q(20);
  const rho = lat => 6.378137 * Math.sqrt(c - n * q(lat)) / n;
  const theta = n * (longitude + 96) * rad;
  const x = rho(latitude) * Math.sin(theta);
  const y = rho(40) - rho(latitude) * Math.cos(theta);
  return [(-1083.82553751 + 864.73251459 * x + 139.54001127 * y) * 2994 / 899,
    (693.98675636 + 119.28221351 * x - 773.17284545 * y) * 3688 / 1106];
}

export function loadTerritories(svg, data) {
  const make = tag => document.createElementNS(svg.namespaceURI, tag);
  const layer = make('g');
  layer.id = 'territories';
  const areas = make('g');
  areas.setAttribute('transform', 'translate(100 90)');
  areas.setAttribute('clip-path', 'url(#land-clip)');
  // Exclude inland water even when the user hides the painted water layers.
  const waterMask = make('mask');
  waterMask.id = 'polity-dry-land';
  waterMask.setAttribute('maskUnits', 'userSpaceOnUse');
  const frame = make('rect');
  for (const [key, value] of Object.entries({x: 0, y: 0, width: 2799, height: 3511})) {
    waterMask.setAttribute(key, value);
    frame.setAttribute(key, value);
  }
  frame.setAttribute('fill', 'white');
  waterMask.append(frame);
  const water = make('g');
  water.style.filter = 'brightness(0)';
  for (const id of ['lake-fill', 'channel', 'streams']) {
    const feature = make('use');
    feature.setAttribute('href', '#' + id);
    water.append(feature);
  }
  waterMask.append(water);
  svg.querySelector('defs').append(waterMask);
  areas.setAttribute('mask', 'url(#polity-dry-land)');
  const seats = make('g');
  layer.append(areas, seats);
  const waterPaths = ['lake-fill', 'channel', 'streams'].map(id => svg.getElementById(id));
  function localPoint(event) {
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(areas.getScreenCTM().inverse());
  }
  const select = document.querySelector('#polity-select');
  const groups = new Map();
  const onSheet = ([x, y]) => x >= 100 && x <= 2899 && y >= 90 && y <= 3601;
  const latLng = ([x, y]) => [(3688 - y) * terrainScale, x * terrainScale];
  function describe(record, position) {
    const section = document.createElement('section');
    const title = document.createElement('strong');
    title.textContent = record.name;
    const note = document.createElement('p');
    note.textContent = record.evidence;
    const scope = document.createElement('p');
    scope.textContent = record.type;
    section.append(title, scope, note);
    if (record.parent) {
      const relation = document.createElement('p');
      relation.textContent = 'Political affiliation: ' + record.parent;
      section.append(relation);
    }
    const [label, url] = data.sources[record.source];
    const link = document.createElement('a');
    link.textContent = label;
    link.href = url;
    section.append(link);
    L.popup().setLatLng(position).setContent(section).openOn(map);
  }
  function bind(shape, record) {
    const title = make('title');
    title.textContent = record.name;
    shape.append(title);
    shape.addEventListener('click', event => {
      if (shape.localName === 'path' && waterPaths.some(path => path.isPointInFill(localPoint(event)))) return;
      L.DomEvent.stopPropagation(event);
      describe(record, map.mouseEventToLatLng(event));
    });
  }
  function drawArea(record) {
    const area = make('path');
    const vertices = record.outline.map(vertex => {
      const [x, y] = polityPoint(vertex);
      return (x - 100).toFixed(2) + ',' + (y - 90).toFixed(2);
    });
    area.setAttribute('d', 'M' + vertices.join(' ') + 'Z');
    area.setAttribute('vector-effect', 'non-scaling-stroke');
    bind(area, record);
    areas.append(area);
    return area;
  }
  const colors = ['#aa6639', '#327983', '#88588f', '#63782e', '#a04f57', '#466aa0'];
  for (const [index, record] of data.records.entries()) {
    const point = polityPoint(record.at);
    if (record.outline && record.politicalExtent !== false) {
      const area = drawArea(record);
      area.style.fill = colors[index % colors.length];
      area.style.fillOpacity = '.28';
      if (record.type === 'Political network') area.classList.add('political-network');
    }
    if (!groups.has(record.region)) {
      const group = document.createElement('optgroup');
      group.label = record.region;
      groups.set(record.region, group);
      select.append(group);
    }
    const option = new Option(record.name + (onSheet(point) ? '' : ' (outside frame)'), index);
    groups.get(record.region).append(option);
    if (!onSheet(point)) continue;
    const seat = make('circle');
    seat.setAttribute('cx', point[0]);
    seat.setAttribute('cy', point[1]);
    seat.setAttribute('vector-effect', 'non-scaling-stroke');
    bind(seat, record);
    seats.append(seat);
  }
  function resizeSeats() {
    seats.style.display = map.getZoom() >= -3 ? '' : 'none';
    const radius = 3 / (terrainScale * 2 ** map.getZoom());
    for (const seat of seats.children) seat.setAttribute('r', radius);
  }
  map.on('zoomend', resizeSeats);
  resizeSeats();
  // Keep inland water and its shoreline visible over the political artwork.
  const ocean = svg.getElementById('ocean');
  layer.setAttribute('transform', 'translate(-100 -90)');
  ocean.before(layer);
  addToggle(panel.querySelector('.features'), layer.id, 'Polities c. 1600');
  select.addEventListener('change', () => {
    if (!select.value) return;
    const record = data.records[Number(select.value)];
    const point = polityPoint(record.at);
    const toggle = panel.querySelector('[data-layer="territories"]');
    if (!toggle.checked) toggle.click();
    const center = onSheet(point) ? latLng(point) : map.getCenter();
    if (onSheet(point)) map.setView(center, Math.max(map.getZoom(), -2), {animate: false});
    describe(record, center);
  });
  const review = document.querySelector('#coverage-notes');
  for (const [region, note, url] of data.review) {
    const p = document.createElement('p');
    const source = document.createElement('a');
    source.href = url;
    source.textContent = 'Source';
    p.append(region + ' — ' + note + ' ', source);
    review.append(p);
  }
  document.querySelector('#polity-key').hidden = false;
}
