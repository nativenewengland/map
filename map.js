const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 4,
});

const markers = (typeof window !== 'undefined' && window.markersData) || [];
let imageOverlay;
let markerLayers = [];

function addMarkers() {
  markerLayers.forEach((m) => map.removeLayer(m));
  markerLayers = [];
  markers.forEach((m) => {
    const layer = L.marker([m.lat, m.lng], { icon: getIcon(m.icon) })
      .addTo(map)
      .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
    markerLayers.push(layer);
  });
}

function loadMap(src) {
  const img = new Image();
  img.onload = () => {
    const bounds = [[img.height, 0], [0, img.width]];
    if (imageOverlay) {
      map.removeLayer(imageOverlay);
    }
    imageOverlay = L.imageOverlay(src, bounds).addTo(map);
    map.fitBounds(bounds);
    addMarkers();
  };
  img.onerror = (e) => {
    console.error('Failed to load map image', e);
  };
  img.src = src;
}

loadMap('./custom_maps/map.png');

const fileInput = document.getElementById('mapUpload');
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => loadMap(ev.target.result);
    reader.readAsDataURL(file);
  });
}

function getIcon(name = 'default.webp') {
  return L.icon({
    iconUrl: `./custom_icons/${name}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

