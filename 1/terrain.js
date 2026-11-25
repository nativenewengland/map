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

async function loadTerritories(svg) {
  const response = await fetch('territories.json');
  if (!response.ok) throw new Error('Territories unavailable');
  const territories = await response.json();
  const group = document.createElementNS(svg.namespaceURI, 'g');
  group.id = 'territories';
  group.setAttribute('transform', 'translate(100 90)');
  group.setAttribute('clip-path', 'url(#land-clip)');
  for (const territory of territories) {
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'M' + territory.outline.map(([x, y]) => (x - 100) + ',' + (y - 90)).join(' ') + 'Z');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    const style = territory.style;
    path.setAttribute('stroke', style.color);
    path.setAttribute('stroke-width', style.weight);
    path.setAttribute('stroke-dasharray', style.dashArray);
    path.setAttribute('fill', style.fillColor);
    path.setAttribute('fill-opacity', style.fillOpacity);
    const title = document.createElementNS(svg.namespaceURI, 'title');
    title.textContent = territory.name;
    path.append(title);
    path.addEventListener('click', event => {
      const content = document.createElement('section');
      const name = document.createElement('strong');
      name.textContent = territory.name;
      const note = document.createElement('p');
      note.textContent = territory.note;
      content.append(name, note);
      for (const url of territory.sources) {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = url.includes('creativecommons.org') ? 'License' : 'Source';
        content.append(link, ' ');
      }
      L.DomEvent.stopPropagation(event);
      L.popup().setLatLng(map.mouseEventToLatLng(event)).setContent(content).openOn(map);
    });
    group.append(path);
  }
  svg.append(group);
  addToggle(panel.querySelector('.features'), group.id, 'Territories');
}

loadTerrain().catch(() => { document.getElementById('map-error').hidden = false; });
function fitMap() {
  map.fitBounds(imageBounds, { padding: [12, 12], animate: false });
}

document.getElementById('reset-view').addEventListener('click', fitMap);
fitMap();
