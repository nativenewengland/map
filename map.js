const map = L.map('map', {
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

(markersData || []).forEach((m) => {
  L.marker([m.lat, m.lng], { icon: getIcon(m.icon) })
    .addTo(map)
    .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
});
