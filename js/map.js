//Creating the Map
var map = L.map('map', {
  zoomAnimation: true,
  markerZoomAnimation: true,
  attributionControl: false
}).setView([0, 0], 0);

var tiles = L.tileLayer('map/{z}/{x}/{y}.jpg', {
  continuousWorld: false,
  noWrap: true,
  minZoom: 2,
  maxZoom: 6,
}).addTo(map);
tiles.once('load', function () {
  baseZoom = map.getZoom();
  rescaleIcons();
});

// Remove default marker shadows
L.Icon.Default.mergeOptions({
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

function showInfo(title, description) {
  var panel = document.getElementById('info-panel');
  document.getElementById('info-title').textContent = title;
  document.getElementById('info-description').textContent = description;
  panel.classList.remove('hidden');
}

document.getElementById('close-info').addEventListener('click', function () {
  document.getElementById('info-panel').classList.add('hidden');
});

map.on('click', function () {
  document.getElementById('info-panel').classList.add('hidden');
});

  var geographicalLocationsIcon = L.icon({
                iconUrl:       'icons/city.png',
                iconRetinaUrl: 'icons/city.png',
                iconSize:    [15, 15],
                iconAnchor:  [7, 15],
                popupAnchor: [1, -15],
                tooltipAnchor: [7, -7]
        });
  var SettlementsIcon = L.icon({
                iconUrl:       'icons/settlement.png',
                iconRetinaUrl: 'icons/settlement.png',
                iconSize:    [15, 15],
                iconAnchor:  [7, 15],
                popupAnchor: [1, -15],
                tooltipAnchor: [7, -7]
        });
  var SachemdomsIcon = L.icon({
                iconUrl:       'icons/town.png',
                iconRetinaUrl: 'icons/town.png',
                iconSize:    [15, 15],
                iconAnchor:  [7, 15],
                popupAnchor: [1, -15],
                tooltipAnchor: [7, -7]
        });
  // Trading
  var TradingIcon = L.icon({
                iconUrl:       'icons/tradeCamp.png',
                iconRetinaUrl: 'icons/tradecamplarge.png',
                iconSize:    [15, 15],
                iconAnchor:  [7, 15],
                popupAnchor: [1, -15],
                tooltipAnchor: [7, -7]
        });


// Map of icon keys to actual icons
var iconMap = {
  city: geographicalLocationsIcon,
  settlement: SettlementsIcon,
  sachemdom: SachemdomsIcon,
  trading: TradingIcon,
};

// Store custom marker data and marker instances
var customMarkers = [];
var allMarkers = [];
var baseZoom;

function rescaleIcons() {
  if (baseZoom === undefined) {
    baseZoom = map.getZoom();
  }
  var scale = Math.pow(2, map.getZoom() - baseZoom);
  allMarkers.forEach(function (m) {
    var base = m._baseIconOptions;
    var opts = Object.assign({}, base);
    if (base.iconSize) opts.iconSize = base.iconSize.map(function (v) { return v * scale; });
    if (base.iconAnchor) opts.iconAnchor = base.iconAnchor.map(function (v) { return v * scale; });
    if (base.shadowSize) opts.shadowSize = base.shadowSize.map(function (v) { return v * scale; });
    if (base.popupAnchor) opts.popupAnchor = base.popupAnchor.map(function (v) { return v * scale; });
    if (base.tooltipAnchor) opts.tooltipAnchor = base.tooltipAnchor.map(function (v) { return v * scale; });
    m.setIcon(L.icon(opts));
  });
}

function saveMarkers() {
  localStorage.setItem('markers', JSON.stringify(customMarkers));
}

function addMarkerToMap(data) {
  var icon = iconMap[data.icon] || geographicalLocationsIcon;
  var customMarker = createMarker(data.lat, data.lng, icon, data.name, data.description).addTo(map);
  customMarker.on('contextmenu', function () {
    map.removeLayer(customMarker);
    customMarkers = customMarkers.filter(function (m) {
      return !(m.lat === data.lat && m.lng === data.lng && m.name === data.name);
    });
    saveMarkers();
  });
  rescaleIcons();
}

// Load markers from localStorage
var stored = localStorage.getItem('markers');
if (stored) {
  customMarkers = JSON.parse(stored);
  customMarkers.forEach(addMarkerToMap);
}

// //// START OF MARKERS
// 1. Marker declarations
function createMarker(lat, lng, icon, name, description) {
  var m = L.marker([lat, lng], { icon: icon }).on('click', function (e) {
    L.DomEvent.stopPropagation(e);
    showInfo(name, description);
  });
  m._baseIconOptions = JSON.parse(JSON.stringify(icon.options));
  allMarkers.push(m);
  return m;
}

var el_gulndar = createMarker(36.0135, -106.3916, SettlementsIcon, 'Gulndar', 'A small but bustling town.');
//  2.Trading post markers

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');

//  3. Geographical Locations MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');

//  4. Sachemdoms MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');

//  5. Forts/Castles MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');

//  6. Temples MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');


// ******END OF MARKERS DECLARATION ******

// MARKER GROUPS
var Settlements = L.layerGroup([el_gulndar]).addTo(map);
// Marker overlay
var overlays= {
  // "GROUPNAME":mg_GROUPNAME
   "Settlements" : Settlements,
}

//GROUP CONTROLS
  L.control.layers(null, overlays).addTo(map);

map.on('zoomend', rescaleIcons);

// Add marker button handler
document.getElementById('add-marker-btn').addEventListener('click', function () {
  alert('Click on the map to place the marker.');
  map.once('click', function (e) {
    var name = prompt('Enter marker name:') || 'Marker';
    var description = prompt('Enter description:') || '';
    var iconKey = prompt('Enter icon (city, settlement, sachemdom, trading):', 'city') || 'city';
    var data = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      name: name,
      description: description,
      icon: iconKey,
    };
    addMarkerToMap(data);
    customMarkers.push(data);
    saveMarkers();
  });
});


