const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 4,
});

const bounds = [[0, 0], [755, 1546]];
L.imageOverlay('custom_maps/Screenshot 2025-08-10 021928.png', bounds).addTo(map);
map.fitBounds(bounds);

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
