const map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'\u00a9 OpenStreetMap contributors'
}).addTo(map);

fetch('markers.json')
  .then(r=>r.json())
  .then(data=>{
    data.forEach(m=>{
      L.marker([m.lat,m.lng]).addTo(map)
        .bindPopup(`<strong>${m.title}</strong><p>${m.description}</p>`);
    });
  })
  .catch(err=>console.error('Marker load failed',err));
