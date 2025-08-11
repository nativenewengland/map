const map = L.map('admin-map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 4,
});

const bounds = [[0, 0], [755, 1546]];
L.imageOverlay('custom_maps/Screenshot 2025-08-10 021928.png', bounds).addTo(map);
map.fitBounds(bounds);

function getIcon(name = 'default.webp') {
  return L.icon({
    iconUrl: `custom_icons/${name}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

let markers = JSON.parse(localStorage.getItem('markers')) || markersData.slice();

const layer = L.layerGroup().addTo(map);

function render() {
  layer.clearLayers();
  markers.forEach((m) => {
    L.marker([m.lat, m.lng], { icon: getIcon(m.icon) })
      .addTo(layer)
      .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
  });
  document.getElementById('output').value = JSON.stringify(markers, null, 2);
}

render();

document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const lat = parseFloat(document.getElementById('lat').value);
  const lng = parseFloat(document.getElementById('lng').value);
  const description = document.getElementById('description').value;
  const icon = document.getElementById('icon').value || 'default.webp';
  markers.push({ name, lat, lng, description, icon });
  localStorage.setItem('markers', JSON.stringify(markers));
  render();
  e.target.reset();
});
