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
  loadTerritories(svg).catch(() => {
    document.querySelector('#territory-error').hidden = false;
  });
}

loadTerrain().catch(() => { document.getElementById('map-error').hidden = false; });
function fitMap() {
  map.fitBounds(imageBounds, { padding: [12, 12], animate: false });
}

document.getElementById('reset-view').addEventListener('click', fitMap);
fitMap();
