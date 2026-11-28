'use strict';

// Map units per SVG viewBox unit at Leaflet zoom 0.
const terrainScale = 10;
const imageWidth = 2994 * terrainScale;
const imageHeight = 3688 * terrainScale;
const imageBounds = L.latLngBounds([[0, 0], [imageHeight, imageWidth]]);
const map = L.map('terrain-map', {
  crs: L.CRS.Simple,
  minZoom: -12,
  maxZoom: 1,
  zoomSnap: 0.25,
  zoomDelta: 0.5,
  maxBounds: imageBounds.pad(0.2),
  maxBoundsViscosity: 0.85,
});

const panel = document.querySelector('#layer-controls');
const master = document.querySelector('#elevation');
const colors = ['#cadab3', '#e3e7c2', '#f9f1c0', '#dac09f', '#d5a38f', '#c37d75'];

function addToggle(container, id, name, color) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = true;
  input.dataset.layer = id;
  label.append(input);
  if (color) {
    const swatch = document.createElement('span');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = color;
    label.append(swatch);
  }
  label.append(name);
  container.append(label);
}

async function loadTerrain() {
  const response = await fetch('terrain.svg');
  if (!response.ok) throw new Error('Terrain unavailable');
  const svg = new DOMParser().parseFromString(await response.text(), 'image/svg+xml').documentElement;
  if (svg.localName !== 'svg') throw new Error('Invalid terrain');
  L.svgOverlay(svg, imageBounds, { attribution: 'Terrain map by Xlicer' }).addTo(map);
  for (const id of ['land', 'ocean', 'lakes', 'rivers', 'coast']) {
    addToggle(panel.querySelector('.features'), id, id === 'coast' ? 'Coastline' : id[0].toUpperCase() + id.slice(1));
  }
  const bands = panel.querySelector('.bands');
  colors.forEach((color, index) => addToggle(bands, 'band' + (index + 1), 'Band ' + (index + 1), color));
  panel.addEventListener('change', event => {
    const inputs = [...bands.querySelectorAll('input')];
    if (event.target === master) {
      for (const input of inputs) input.checked = master.checked;
    }
    for (const input of panel.querySelectorAll('[data-layer]')) {
      svg.getElementById(input.dataset.layer).style.display = input.checked ? '' : 'none';
    }
    master.checked = inputs.every(input => input.checked);
    master.indeterminate = !master.checked && inputs.some(input => input.checked);
  });
  panel.hidden = false;
  const error = document.querySelector('#territory-error');
  let attempt = 0;
  async function openInventory() {
    error.hidden = true;
    const suffix = attempt++ ? '?retry=' + attempt : '';
    try {
      const [module, response] = await Promise.all([
        import('./polities.js' + suffix),
        fetch('polities.json' + suffix, { cache: 'no-cache' }),
      ]);
      if (!response.ok) throw new Error('Inventory request returned HTTP ' + response.status);
      module.loadTerritories(svg, await response.json());
    } catch (cause) {
      console.error('Political inventory', cause);
      if (attempt === 1) return openInventory();
      error.querySelector('span').textContent = 'The political inventory could not load. ' + cause.message;
      error.hidden = false;
    }
  }
  document.querySelector('#retry-inventory').addEventListener('click', openInventory);
  openInventory();
  const params = new URLSearchParams(location.search);
  if (params.has('lon') && params.has('lat') && params.has('grant')) {
    const lon = Number(params.get('lon'));
    const lat = Number(params.get('lat'));
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;
    const {polityPoint} = await import('./polities.js');
    const [x, y] = polityPoint([lon, lat]);
    const point = [(3688 - y) * terrainScale, x * terrainScale];
    if (!imageBounds.contains(point)) return;
    const caption = document.createElement('span');
    caption.textContent = params.get('grant') + ' (approximate locality)';
    map.setView(point, -3);
    L.circleMarker(point, {radius: 6}).addTo(map).bindPopup(caption).openPopup();
  }
}

loadTerrain().catch(() => { document.getElementById('map-error').hidden = false; });
function fitMap() {
  map.fitBounds(imageBounds, { padding: [12, 12], animate: false });
}

document.getElementById('reset-view').addEventListener('click', fitMap);
fitMap();
