/* Build the regional boundary asset from the pinned Zenodo release.
   Run node scripts/build-homelands.cjs [directory containing the .shp and .dbf]. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { readTerritories, territoryFile, territoryRecord } = require('../1/homelands.js');

async function load(extension, checksum) {
  const filename = territoryFile + '.' + extension;
  let data;
  if (process.argv[2]) {
    data = await fs.readFile(path.join(process.argv[2], filename));
  } else {
    const response = await fetch(territoryRecord + '/files/' + encodeURIComponent(filename) + '?download=1');
    if (!response.ok) throw new Error('Download failed: ' + response.status + ' ' + filename);
    data = Buffer.from(await response.arrayBuffer());
  }
  if (createHash('md5').update(data).digest('hex') !== checksum) throw new Error('File differs from the published release: ' + filename);
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
}

async function build() {
  const data = await Promise.all([load('shp', '77b8df56be5d79eb91cac7c43d9e5bca'), load('dbf', '357a81124d0ad3bf8ddf4372fe9a1152')]);
  const regions = readTerritories(...data);
  const destination = path.join(__dirname, '../1/driver-homelands.json');
  await fs.writeFile(destination + '.tmp', JSON.stringify(regions));
  await fs.rename(destination + '.tmp', destination);
  console.log('Wrote ' + regions.length + ' source records to ' + destination);
}
build().catch(error => { console.error(error.cause || error); process.exitCode = 1; });
