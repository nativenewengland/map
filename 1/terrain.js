'use strict';

const imageWidth = 2994;
const imageHeight = 3688;
const imageBounds = L.latLngBounds([[0, 0], [imageHeight, imageWidth]]);
const map = L.map('terrain-map', {
  crs: L.CRS.Simple,
  minZoom: -8,
  maxZoom: 1,
  zoomSnap: 0.25,
  zoomDelta: 0.5,
  maxBounds: imageBounds.pad(0.2),
  maxBoundsViscosity: 0.85,
});

L.imageOverlay('terrain.png', imageBounds, {
  alt: 'Xlicer terrain map of northeastern North America',
  attribution: 'Terrain map by Xlicer',
}).on('error', () => {
  document.getElementById('map-error').hidden = false;
}).addTo(map);

function fitMap() {
  map.fitBounds(imageBounds, { padding: [12, 12], animate: false });
}

document.getElementById('reset-view').addEventListener('click', fitMap);
fitMap();
