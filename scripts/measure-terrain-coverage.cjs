// Run from the repository root with Node 22+ and sharp installed.
const fs = require('node:fs');
const sharp = require('sharp');

async function measure() {
  const { polityPoint } = await import('../1/polities.js');
  const terrain = fs.readFileSync('1/terrain.svg', 'utf8');
  const { records } = JSON.parse(fs.readFileSync('1/polities.json', 'utf8'));
  const width = 2799, height = 3511;
  function path(id, fill) {
    const tag = terrain.match(new RegExp('<path\\b[^>]*\\bid="' + id + '"[^>]*>'))?.[0];
    const d = tag?.match(/\sd="([^"]+)"/)?.[1];
    if (!d) throw Error('Missing terrain path ' + id);
    return '<path fill-rule="evenodd" fill="' + fill + '" d="' + d + '"/>';
  }
  async function raster(shapes) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width +
      '" height="' + height + '"><rect width="100%" height="100%" fill="black"/>' + shapes + '</svg>';
    return sharp(Buffer.from(svg)).greyscale().raw().toBuffer();
  }
  const dry = await raster(path('land-shape', 'white') +
    ['lake-fill', 'channel', 'streams'].map(id => path(id, 'black')).join(''));
  const polygons = records.filter(record => record.outline && record.politicalExtent !== false);
  function polygon(record) {
    const points = record.outline.map(vertex => {
      const [x,y] = polityPoint(vertex);
      return (x - 100).toFixed(2) + ',' + (y - 90).toFixed(2);
    });
    return '<polygon fill="white" points="' + points.join(' ') + '"/>';
  }
  const union = await raster(polygons.map(polygon).join(''));
  const ancestral = await raster(records.filter(r => r.homelandExtent && r.outline).map(polygon).join(''));
  // Registered sheet grid, north to south and west to east within each row.
  const rows = 5, columns = 4;
  const grid = Array.from({length: rows * columns}, (_, i) => ({
    cell: String.fromCharCode(65 + Math.floor(i / columns)) + (1 + i % columns),
    dryPixels: 0, politicallyUnassigned: 0, outsideBothLayers: 0
  }));
  let land = 0, covered = 0, ancestralOnly = 0;
  for (let i = 0; i < dry.length; i++) {
    if (dry[i] < 128) continue;
    land++;
    const cell = grid[Math.floor(Math.floor(i / width) * rows / height) * columns +
      Math.floor((i % width) * columns / width)];
    cell.dryPixels++;
    if (union[i] < 128) {
      cell.politicallyUnassigned++;
      if (ancestral[i] < 128) cell.outsideBothLayers++;
    }
    if (union[i] >= 128) covered++;
    else if (ancestral[i] >= 128) ancestralOnly++;
  }
  const noDryLand = [];
  for (const record of polygons) {
    const mask = await raster(polygon(record));
    if (!mask.some((value, i) => value >= 128 && dry[i] >= 128)) noDryLand.push(record.name);
  }
  const pointOnly = records.filter(record => !polygons.includes(record) && !(record.homelandExtent && record.outline));
  const onSheetPoints = pointOnly.filter(record => {
    const [x,y] = polityPoint(record.at);
    return x >= 100 && x <= 2899 && y >= 90 && y <= 3601;
  });
  console.log(JSON.stringify({ polygons: polygons.length, onSheetPoliticalPolygons: polygons.length - noDryLand.length,
    grid, noDryLand, pointOnly: pointOnly.length, onSheetPointOnly: onSheetPoints.length, dryPixels: land, coveredPixels: covered,
    ancestralOnly, combinedPercent: 100 * (covered + ancestralOnly) / land, uncoveredPixels: land - covered, coveredPercent: 100 * covered / land }, null, 2));
}
measure().catch(error => { console.error(error); process.exitCode = 1; });
