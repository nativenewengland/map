// Perreault (2025), digitizing Driver et al. (1953), Zenodo record 17289576.
// Input coordinates are NAD83 / North America Albers (ESRI:102008), in metres.
const territoryRecord = 'https://zenodo.org/records/17289576';
const territoryFile = 'Driver et al 1953 Ethnolinguistic territories of America';

function sheetPoint(easting, northing) {
  // Affine registration to the illustrated sheet, using 13 landmarks from
  // western Lake Ontario and Quebec City through Cape Cod and Cape May.
  const x = easting / 1e6;
  const y = northing / 1e6;
  return [
    (-1083.82553751 + 864.73251459 * x + 139.54001127 * y) * 2994 / 899,
    (693.98675636 + 119.28221351 * x - 773.17284545 * y) * 3688 / 1106,
  ];
}

function readTerritories(shapeBuffer, tableBuffer) {
  const shp = new DataView(shapeBuffer);
  const dbf = new DataView(tableBuffer);
  if (shp.getInt32(0) !== 9994 || shp.getInt32(32, true) !== 5) {
    throw new Error('Expected polygon shapefile');
  }
  const decoder = new TextDecoder('utf-8');
  const count = dbf.getUint32(4, true);
  const header = dbf.getUint16(8, true);
  const stride = dbf.getUint16(10, true);
  const fields = {};
  let column = 1;
  for (let pos = 32; pos < header && dbf.getUint8(pos) !== 13; pos += 32) {
    const name = decoder.decode(new Uint8Array(tableBuffer, pos, 11)).split('\0')[0].toLowerCase();
    const length = dbf.getUint8(pos + 16);
    fields[name] = { column, length };
    column += length;
  }
  if (!fields.name) throw new Error('Expected a Name column');
  const territories = [];
  let record = 0;
  for (let offset = 100; offset < shp.byteLength; record++) {
    const start = offset + 8;
    offset = start + 2 * shp.getUint32(offset + 4);
    if (offset > shp.byteLength || record >= count) throw new Error('Incomplete territory file');
    if (shp.getInt32(start, true) === 0 || dbf.getUint8(header + record * stride) === 42) continue;
    const bounds = Array.from({length: 4}, (_, i) => shp.getFloat64(start + 4 + i * 8, true));
    const corners = [sheetPoint(bounds[0], bounds[1]), sheetPoint(bounds[2], bounds[1]),
      sheetPoint(bounds[0], bounds[3]), sheetPoint(bounds[2], bounds[3])];
    if (corners.every(p => p[0] < 100) || corners.every(p => p[0] > 2899) ||
        corners.every(p => p[1] < 90) || corners.every(p => p[1] > 3601)) continue;
    const parts = shp.getInt32(start + 36, true);
    const points = shp.getInt32(start + 40, true);
    const base = start + 44 + parts * 4;
    if (base + points * 16 > offset) throw new Error('Incomplete polygon');
    let path = '';
    for (let part = 0; part < parts; part++) {
      const first = shp.getInt32(start + 44 + part * 4, true);
      const end = part + 1 === parts ? points : shp.getInt32(start + 48 + part * 4, true);
      let last;
      const ring = [];
      for (let i = first; i < end; i++) {
        const pos = base + i * 16;
        const p = sheetPoint(shp.getFloat64(pos, true), shp.getFloat64(pos + 8, true));
        // Keep shoreline islands and polygon holes, including multipart records.
        const pair = (p[0] - 100).toFixed(1) + ',' + (p[1] - 90).toFixed(1);
        if (pair !== last) ring.push(pair);
        last = pair;
      }
      if (ring.length >= 3) path += 'M' + ring.join(' ') + 'Z';
    }
    function value(field) {
      if (!field) return '';
      return decoder.decode(new Uint8Array(tableBuffer,
        header + record * stride + field.column, field.length)).trim();
    }
    if (path) territories.push({name: value(fields.name) || value(fields.other) || 'Unnamed source area',
      other: value(fields.other), family: value(fields[Object.keys(fields).find(k => k.startsWith('lang'))]), path});
  }
  if (record !== count || !territories.length) throw new Error('No matching regional records');
  return territories;
}

async function downloadTerritories() {
  const bundled = await fetch('driver-homelands.json');
  if (bundled.ok) return bundled.json();
  async function getFile(ext) {
    const name = encodeURIComponent(territoryFile + '.' + ext);
    const response = await fetch(territoryRecord + '/files/' + name + '?download=1');
    if (!response.ok) throw new Error('Territory download failed');
    return response.arrayBuffer();
  }
  const files = await Promise.all(['shp', 'dbf'].map(getFile));
  return readTerritories(...files);
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { readTerritories, territoryFile, territoryRecord };
}
