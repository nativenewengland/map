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
  rescaleTextLabels();
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
  clearSelectedMarker();
});

map.on('click', function () {
  document.getElementById('info-panel').classList.add('hidden');
  clearSelectedMarker();
});

  var geographicalLocationsIcon = L.icon({
                iconUrl:       'icons/wigwam.png',
                iconRetinaUrl: 'icons/wigwam.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  var SettlementsIcon = L.icon({
                iconUrl:       'icons/settlement.png',
                iconRetinaUrl: 'icons/settlement.png',

                iconSize:    [1.875, 1.875],
                iconAnchor:  [0.875, 1.875],
                popupAnchor: [0.125, -1.875],
                tooltipAnchor: [0.875, -0.875]


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
                iconUrl:       'icons/rock.png',
                iconRetinaUrl: 'icons/rock.png',
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
var customTextLabels = [];
var allMarkers = [];
var allTextLabels = [];
var baseZoom;
var selectedMarker = null;

function clearSelectedMarker() {
  if (selectedMarker && selectedMarker._icon) {
    selectedMarker._icon.classList.remove('marker-selected');
    selectedMarker = null;
  }
}

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

function rescaleTextLabels() {
  if (baseZoom === undefined) {
    baseZoom = map.getZoom();
  }
  var scale = Math.pow(2, map.getZoom() - baseZoom);
  allTextLabels.forEach(function (m) {
    if (m._icon) {
      var span = m._icon.querySelector('span');
      if (span) {
        span.style.fontSize = m._baseFontSize * scale + 'px';
      }
    }
  });
}

function saveMarkers() {
  localStorage.setItem('markers', JSON.stringify(customMarkers));
}

function saveTextLabels() {
  localStorage.setItem('textLabels', JSON.stringify(customTextLabels));
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

function addTextLabelToMap(data) {
  var textIcon = L.divIcon({
    className: 'text-label',
    html: '<span style="font-size:' + data.size + 'px">' + data.text + '</span>',
  });
  var m = L.marker([data.lat, data.lng], { icon: textIcon })
    .on('click', function (ev) {
      L.DomEvent.stopPropagation(ev);
      clearSelectedMarker();
      if (this._icon) {
        this._icon.classList.add('marker-selected');
        selectedMarker = this;
      }
      showInfo(data.text, data.description);
    })
    .on('contextmenu', function () {
      map.removeLayer(m);
      customTextLabels = customTextLabels.filter(function (t) {
        return !(
          t.lat === data.lat &&
          t.lng === data.lng &&
          t.text === data.text &&
          t.size === data.size &&
          t.description === data.description
        );
      });
      allTextLabels = allTextLabels.filter(function (t) {
        return t !== m;
      });
      saveTextLabels();
    })
    .addTo(map);
  m._baseFontSize = data.size;
  allTextLabels.push(m);
  rescaleTextLabels();
}

// Load markers from localStorage
var stored = localStorage.getItem('markers');
if (stored) {
  customMarkers = JSON.parse(stored);
  customMarkers.forEach(addMarkerToMap);
}

var storedTexts = localStorage.getItem('textLabels');
if (storedTexts) {
  customTextLabels = JSON.parse(storedTexts);
  customTextLabels.forEach(addTextLabelToMap);
}

// //// START OF MARKERS
// 1. Marker declarations
function createMarker(lat, lng, icon, name, description) {
  var m = L.marker([lat, lng], { icon: icon }).on('click', function (e) {
    L.DomEvent.stopPropagation(e);
    clearSelectedMarker();
    if (this._icon) {
      this._icon.classList.add('marker-selected');
      selectedMarker = this;
    }
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
map.on('zoomend', rescaleTextLabels);

function showMarkerForm(latlng) {
  var overlay = document.getElementById('marker-form-overlay');
  var saveBtn = document.getElementById('marker-save');
  var cancelBtn = document.getElementById('marker-cancel');
  overlay.classList.remove('hidden');

  function submitHandler() {
    var name = document.getElementById('marker-name').value || 'Marker';
    var description =
      document.getElementById('marker-description').value || '';
    var iconKey = document.getElementById('marker-icon').value || 'city';
    var data = {
      lat: latlng.lat,
      lng: latlng.lng,
      name: name,
      description: description,
      icon: iconKey,
    };
    addMarkerToMap(data);
    customMarkers.push(data);
    saveMarkers();
    cleanup();
  }

  function cancelHandler() {
    cleanup();
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
    document.getElementById('marker-name').value = '';
    document.getElementById('marker-description').value = '';
    document.getElementById('marker-icon').value = 'city';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

var AddMarkerControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar');
    var link = L.DomUtil.create('a', '', container);
    link.id = 'add-marker-btn';
    link.href = '#';
    link.title = 'Add Marker';
    link.innerHTML = '+';
    L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
      .on(link, 'click', L.DomEvent.preventDefault)
      .on(link, 'click', function () {
        alert('Click on the map to place the marker.');
        map.once('click', function (e) {
          showMarkerForm(e.latlng);
        });
      });
    return container;
  },
});

map.addControl(new AddMarkerControl());

// Control to add text labels
var AddTextControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar');
    var link = L.DomUtil.create('a', '', container);
    link.id = 'add-text-btn';
    link.href = '#';
    link.title = 'Add Text';
    link.innerHTML = 'T';
    L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
      .on(link, 'click', L.DomEvent.preventDefault)
      .on(link, 'click', function () {
        alert('Click on the map to place the text.');
        map.once('click', function (e) {
          var text = prompt('Enter text:') || '';
          if (!text) return;
          var size = parseInt(prompt('Enter text size in pixels:', '14'), 10) || 14;
          var description = prompt('Enter description:') || '';
          var data = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            text: text,
            size: size,
            description: description,
          };
          addTextLabelToMap(data);
          customTextLabels.push(data);
          saveTextLabels();
        });
      });
    return container;
  },
});

map.addControl(new AddTextControl());



