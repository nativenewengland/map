const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 4,
});

const imageUrl = './custom_maps/map.png';
const img = new Image();
img.src = imageUrl;
img.onload = () => {
  const bounds = [[img.height, 0], [0, img.width]];
  L.imageOverlay(imageUrl, bounds).addTo(map);
  map.fitBounds(bounds);

  const markers = (typeof window !== 'undefined' && window.markersData) || [];
  markers.forEach((m) => {
    L.marker([m.lat, m.lng], { icon: getIcon(m.icon) })
      .addTo(map)
      .bindPopup(`<h3>${m.name}</h3><p>${m.description}</p>`);
  });
};

img.onerror = (e) => {
  console.error('Failed to load map image', e);
};

function getIcon(name = 'default.webp') {
  return L.icon({
    iconUrl: `./custom_icons/${name}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}
