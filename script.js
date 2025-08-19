const map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'\u00a9 OpenStreetMap contributors'
}).addTo(map);
L.control.scale({metric:false}).addTo(map);

const icons = {
  city: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
  }),
  town: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
  }),
  poi: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
  })
};

const groups = {
  city: L.layerGroup().addTo(map),
  town: L.layerGroup().addTo(map),
  poi: L.layerGroup().addTo(map)
};

fetch('markers.json')
  .then(r=>r.json())
  .then(data=>{
    data.forEach(m=>{
      const icon = icons[m.type] || icons.poi;
      const group = groups[m.type] || groups.poi;
      L.marker([m.lat,m.lng],{icon}).addTo(group)
        .bindPopup(`<strong>${m.title}</strong><p>${m.description}</p>`);
    });
    L.control.layers(null, {
      'Cities': groups.city,
      'Towns': groups.town,
      'Points of Interest': groups.poi
    }).addTo(map);
  })
  .catch(err=>console.error('Marker load failed',err));
