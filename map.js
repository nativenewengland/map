const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const customIcon = L.divIcon({
  className: 'custom-icon',
  html: '<div class="custom-marker"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

(markersData || []).forEach((m) => {
  L.marker([m.lat, m.lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
});
