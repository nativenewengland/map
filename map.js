const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = (typeof window !== 'undefined' && window.markersData) || [];
const markerLayers = [];

function addMarkers() {
  markerLayers.forEach((m) => map.removeLayer(m));
  markerLayers.length = 0;
  markers.forEach((m) => {
    const layer = L.marker([m.lat, m.lng], { icon: getIcon(m.icon) })
      .addTo(map)
      .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
    markerLayers.push(layer);
  });
}

addMarkers();

function getIcon(name = 'default.webp') {
  return L.icon({
    iconUrl: `./custom_icons/${name}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}
