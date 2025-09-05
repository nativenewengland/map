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
  const html = DOMPurify.sanitize(marked.parse(description));
  document.getElementById('info-description').innerHTML = html;
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

  var WigwamIcon = L.icon({
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
  var CapitalIcon = L.icon({
                iconUrl:       'icons/capital.png',
                iconRetinaUrl: 'icons/capital.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  // Rock
  var RockIcon = L.icon({
                iconUrl:       'icons/rock.png',
                iconRetinaUrl: 'icons/rock.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  // Fishing
  var fishingIconPath = 'icons/fish1.png';
  var FishingIcon = L.icon({
                iconUrl:       fishingIconPath,
                iconRetinaUrl: fishingIconPath,
                // Preserve the original aspect ratio of the fish icon (25x11)
                iconSize:    [2.84, 1.25],
                iconAnchor:  [1.42, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [1.42, -0.625]
        });
  var AgricultureIcon = L.icon({
                iconUrl:       'icons/plantinggrounds.png',
                iconRetinaUrl: 'icons/plantinggrounds.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  var PteroglyphIcon = L.icon({
                iconUrl:       'icons/petrogliph.png',
                iconRetinaUrl: 'icons/petrogliph.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  var MineIcon = L.icon({
                iconUrl:       'icons/mine.png',
                iconRetinaUrl: 'icons/mine.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  var FortsIcon = L.icon({
                iconUrl:       'icons/fort.png',
                iconRetinaUrl: 'icons/fort.png',
                iconSize:    [2, 1.25],
                iconAnchor:  [1, 1.25],
                popupAnchor: [0.2, -1.25],
                tooltipAnchor: [1, -0.625]
        });
  var ChambersIcon = L.icon({
                iconUrl:       'icons/csl.png',
                iconRetinaUrl: 'icons/csl.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });
  var CampsIcon = L.icon({
                iconUrl:       'icons/fire.png',
                iconRetinaUrl: 'icons/fire.png',
                iconSize:    [1.25, 1.25],
                iconAnchor:  [0.625, 1.25],
                popupAnchor: [0.125, -1.25],
                tooltipAnchor: [0.625, -0.625]
        });


// Map of icon keys to actual icons
var iconMap = {
  wigwam: WigwamIcon,
  settlement: SettlementsIcon,
  capital: CapitalIcon,
  rock: RockIcon,
  fishing: FishingIcon,
  agriculture: AgricultureIcon,
  pteroglyph: PteroglyphIcon,
  mine: MineIcon,
  forts: FortsIcon,
  chambers: ChambersIcon,
  camps: CampsIcon,
};

// Store custom marker data and marker instances
var customMarkers = [];
var customTextLabels = [];
var customPolygons = [];
var allMarkers = [];
var allTextLabels = [];
var baseZoom;
var selectedMarker = null;
var territoriesLayer = L.layerGroup().addTo(map);

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
        span.style.letterSpacing = (m._baseLetterSpacing || 0) * scale + 'px';
      } else {
        var svg = m._icon.querySelector('svg');
        if (svg) {
          var text = svg.querySelector('text');
          if (text) {
            text.style.fontSize = m._baseFontSize * scale + 'px';
            text.style.letterSpacing = (m._baseLetterSpacing || 0) * scale + 'px';
          }
          if (m._baseCurve) {
            var path = svg.querySelector('path');
            if (path) {
              var width = (m._basePathWidth || 0) * scale;
              var r = Math.abs(m._baseCurve) * scale;
              var sweep = m._baseCurve > 0 ? 0 : 1;
              path.setAttribute('d', 'M0,0 A' + r + ',' + r + ' 0 0,' + sweep + ' ' + width + ',0');
            }
          }
        }
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

function savePolygons() {
  localStorage.setItem('polygons', JSON.stringify(customPolygons));
}

function addPolygonToMap(data) {
  var opts = Object.assign(
    {
      color: '#3388ff',
      weight: 2,
      fillColor: '#3388ff',
      fillOpacity: 0.3,
    },
    data.style || {}
  );
  var poly = L.polygon(data.coords, opts)
    .bindPopup(
      '<b>' + (data.name || '') + '</b>' +
        (data.description ? '<br>' + data.description : '')
    )
    .addTo(territoriesLayer);
  poly.on('contextmenu', function () {
    territoriesLayer.removeLayer(poly);
    customPolygons = customPolygons.filter(function (p) {
      return !(
        p.name === data.name &&
        p.description === data.description &&
        JSON.stringify(p.coords) === JSON.stringify(data.coords)
      );
    });
    savePolygons();
  });
  return poly;
}

function addMarkerToMap(data) {
  var icon = iconMap[data.icon] || WigwamIcon;
  var customMarker = createMarker(
    data.lat,
    data.lng,
    icon,
    data.name,
    data.description
  ).addTo(map);
  customMarker._data = data;
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
  if (data.spacing === undefined) data.spacing = 0;
  var textIcon;
  var pathWidth = 0;
  if (data.curve) {
    var tempSpan = document.createElement('span');
    tempSpan.style.fontSize = data.size + 'px';
    tempSpan.style.letterSpacing = data.spacing + 'px';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.style.visibility = 'hidden';
    tempSpan.textContent = data.text;
    document.body.appendChild(tempSpan);
    pathWidth = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    var r = Math.abs(data.curve);
    var sweep = data.curve > 0 ? 0 : 1;
    var pathId = 'text-curve-' + Date.now() + Math.random().toString(36).slice(2);
    var d = 'M0,0 A' + r + ',' + r + ' 0 0,' + sweep + ' ' + pathWidth + ',0';
    var svgHtml =
      '<svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(' +
      (data.angle || 0) +
      'deg);"><path id="' +
      pathId +
      '" d="' +
      d +
      '" fill="none"></path><text style="font-size:' +
      data.size +
      'px; letter-spacing:' +
      data.spacing +
      'px;"><textPath href="#' +
      pathId +
      '">' +
      data.text +
      '</textPath></text></svg>';
    textIcon = L.divIcon({ className: 'text-label', html: svgHtml, iconAnchor: [0, 0] });
  } else {
    textIcon = L.divIcon({
      className: 'text-label',
      html:
        '<span style="font-size:' +
        data.size +
        'px; letter-spacing:' +
        data.spacing +
        'px; transform: rotate(' +
        (data.angle || 0) +
        'deg);">' +
        data.text +
        '</span>',
      iconAnchor: [0, 0],
    });
  }
  var m = L.marker([data.lat, data.lng], { icon: textIcon, draggable: true })
    .on('click', function (ev) {
      L.DomEvent.stopPropagation(ev);
      clearSelectedMarker();
      if (this._icon) {
        this._icon.classList.add('marker-selected');
        selectedMarker = this;
      }
      showInfo(data.text, data.description);
    })
    .on('dblclick', function (ev) {
      L.DomEvent.stopPropagation(ev);
      editTextForm(m);
    })
    .on('dragend', function () {
      if (m._data) {
        var pos = m.getLatLng();
        m._data.lat = pos.lat;
        m._data.lng = pos.lng;
        saveTextLabels();
      }
    })
    .on('contextmenu', function () {
      map.removeLayer(m);
      customTextLabels = customTextLabels.filter(function (t) {
        return !(
          t.lat === data.lat &&
          t.lng === data.lng &&
          t.text === data.text &&
          t.size === data.size &&
          t.description === data.description &&
          t.angle === data.angle &&
          t.spacing === data.spacing &&
          (t.curve || 0) === (data.curve || 0)
        );
      });
      allTextLabels = allTextLabels.filter(function (t) {
        return t !== m;
      });
      saveTextLabels();
    })
    .addTo(map);
  m._baseFontSize = data.size;
  m._baseLetterSpacing = data.spacing;
  if (data.curve) {
    m._baseCurve = data.curve;
    m._basePathWidth = pathWidth;
  }
  m._data = data;
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

var storedPolygons = localStorage.getItem('polygons');
if (storedPolygons) {
  customPolygons = JSON.parse(storedPolygons);
  customPolygons.forEach(addPolygonToMap);
}

var baseTextLabels = [
  {
    lat: 42.5,
    lng: -72.7,
    text: 'Pocomtuc Confederacy',
    description: '',
    size: 24,
  },
  {
    lat: 42.2,
    lng: -71.8,
    text: 'Nipmuc',
    description: '',
    size: 24,
  },
  {
    lat: 42.35,
    lng: -71.0,
    text: 'Massachusett',
    description: '',
    size: 24,
  },
  {
    lat: 41.7,
    lng: -70.3,
    text: 'Wampanoag',
    description: '',
    size: 24,
  },
  {
    lat: 41.5,
    lng: -71.5,
    text: 'Narragansett',
    description: '',
    size: 24,
  },
  {
    lat: 41.7,
    lng: -71.2,
    text: 'Pokanoket',
    description: '',
    size: 24,
  },
  {
    lat: 41.5,
    lng: -69.5,
    text: 'Weekehikum',
    description: '',
    size: 24,
    angle: 90,
  },
  {
    lat: 42.6,
    lng: -70.9,
    text: 'Agawam',
    description: '',
    size: 24,
  },
];
baseTextLabels.forEach(addTextLabelToMap);

var baseTerritories = [
  {
    name: 'Northern Territory',
    description: 'Example northern area.',
    coords: [
      [35.8, -106.6],
      [35.8, -105.8],
      [36.4, -105.8],
      [36.4, -106.6],
    ],
    style: { color: '#ff7800', fillColor: '#ff7800', fillOpacity: 0.3 },
  },
  {
    name: 'Southern Territory',
    description: 'Example southern area.',
    coords: [
      [35.2, -106.6],
      [35.2, -105.8],
      [35.8, -105.8],
      [35.8, -106.6],
    ],
    style: { color: '#0078ff', fillColor: '#0078ff', fillOpacity: 0.3 },
  },
  {
    name: 'Agawam Territory',
    description: 'Territory of the Agawam people around Cape Ann.',
    coords: [
      [42.85, -70.92],
      [42.87, -70.7],
      [42.75, -70.58],
      [42.62, -70.6],
      [42.55, -70.67],
      [42.5, -70.82],
      [42.44, -70.93],
      [42.36, -71.04],
      [42.36, -71.15],
      [42.47, -71.2],
      [42.6, -71.23],
      [42.75, -71.1],
    ],
    style: { color: '#666666', fillColor: '#666666', fillOpacity: 0.3 },
  },
];
baseTerritories.forEach(addPolygonToMap);

// //// START OF MARKERS
// 1. Marker declarations
function createMarker(lat, lng, icon, name, description) {
  var m = L.marker([lat, lng], { icon: icon, draggable: true })
    .on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      clearSelectedMarker();
      if (this._icon) {
        this._icon.classList.add('marker-selected');
        selectedMarker = this;
      }
      var d = this._data || { name: name, description: description };
      showInfo(d.name, d.description);
    })
    .on('dragend', function () {
      if (m._data) {
        var pos = m.getLatLng();
        m._data.lat = pos.lat;
        m._data.lng = pos.lng;
        saveMarkers();
      }
    })
    .on('dblclick', function (e) {
      L.DomEvent.stopPropagation(e);
      if (m._data) {
        editMarkerForm(m);
      }
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

//  4. Capitals MARKERS

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
   "Territories": territoriesLayer,
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
    var iconKey = document.getElementById('marker-icon').value || 'wigwam';
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
    document.getElementById('marker-icon').value = 'wigwam';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

function editMarkerForm(marker) {
  if (!marker || !marker._data) return;
  var overlay = document.getElementById('marker-form-overlay');
  var saveBtn = document.getElementById('marker-save');
  var cancelBtn = document.getElementById('marker-cancel');
  var title = document.querySelector('#marker-form h3');
  overlay.classList.remove('hidden');

  document.getElementById('marker-name').value = marker._data.name || '';
  document.getElementById('marker-description').value = marker._data.description || '';
  document.getElementById('marker-icon').value = marker._data.icon || 'wigwam';
  if (title) title.textContent = 'Edit Marker';

  function submitHandler() {
    var name = document.getElementById('marker-name').value || 'Marker';
    var description = document.getElementById('marker-description').value || '';
    var iconKey = document.getElementById('marker-icon').value || 'wigwam';

    marker._data.name = name;
    marker._data.description = description;
    marker._data.icon = iconKey;

    var newIcon = iconMap[iconKey] || WigwamIcon;
    marker.setIcon(newIcon);
    marker._baseIconOptions = JSON.parse(JSON.stringify(newIcon.options));
    rescaleIcons();
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
    document.getElementById('marker-icon').value = 'wigwam';
    if (title) title.textContent = 'Add Marker';
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

function showTextForm(latlng) {
  var overlay = document.getElementById('text-form-overlay');
  var saveBtn = document.getElementById('text-save');
  var cancelBtn = document.getElementById('text-cancel');
  overlay.classList.remove('hidden');

  function submitHandler() {
    var text = document.getElementById('text-label-text').value || '';
    if (!text) {
      cleanup();
      return;
    }
    var description = document.getElementById('text-label-description').value || '';
    var size = parseFloat(document.getElementById('text-label-size').value) || 14;
    var angle = parseFloat(document.getElementById('text-label-angle').value) || 0;
    var spacing = parseFloat(document.getElementById('text-letter-spacing').value) || 0;
    var curve = parseFloat(document.getElementById('text-curve-radius').value) || 0;
    var data = {
      lat: latlng.lat,
      lng: latlng.lng,
      text: text,
      description: description,
      size: size,
      angle: angle,
      spacing: spacing,
      curve: curve,
    };
    addTextLabelToMap(data);
    customTextLabels.push(data);
    saveTextLabels();
    cleanup();
  }

  function cancelHandler() {
    cleanup();
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
    document.getElementById('text-label-text').value = '';
    document.getElementById('text-label-description').value = '';
    document.getElementById('text-label-size').value = '14';
    document.getElementById('text-label-angle').value = '0';
    document.getElementById('text-letter-spacing').value = '0';
    document.getElementById('text-curve-radius').value = '0';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

function editTextForm(labelMarker) {
  if (!labelMarker || !labelMarker._data) return;
  var overlay = document.getElementById('text-form-overlay');
  var saveBtn = document.getElementById('text-save');
  var cancelBtn = document.getElementById('text-cancel');
  var data = labelMarker._data;

  document.getElementById('text-label-text').value = data.text || '';
  document.getElementById('text-label-description').value = data.description || '';
  document.getElementById('text-label-size').value = data.size || 14;
  document.getElementById('text-label-angle').value = data.angle || 0;
  document.getElementById('text-letter-spacing').value = data.spacing || 0;
  document.getElementById('text-curve-radius').value = data.curve || 0;
  overlay.classList.remove('hidden');

  function submitHandler() {
    var text = document.getElementById('text-label-text').value || '';
    if (!text) {
      cleanup();
      return;
    }
    var description = document.getElementById('text-label-description').value || '';
    var size = parseFloat(document.getElementById('text-label-size').value) || 14;
    var angle = parseFloat(document.getElementById('text-label-angle').value) || 0;
    var spacing = parseFloat(document.getElementById('text-letter-spacing').value) || 0;
    var curve = parseFloat(document.getElementById('text-curve-radius').value) || 0;

    var textIcon;
    var pathWidth = 0;
    if (curve) {
      var tempSpan = document.createElement('span');
      tempSpan.style.fontSize = size + 'px';
      tempSpan.style.letterSpacing = spacing + 'px';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.visibility = 'hidden';
      tempSpan.textContent = text;
      document.body.appendChild(tempSpan);
      pathWidth = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);
      var r = Math.abs(curve);
      var sweep = curve > 0 ? 0 : 1;
      var pathId = 'text-curve-' + Date.now() + Math.random().toString(36).slice(2);
      var d = 'M0,0 A' + r + ',' + r + ' 0 0,' + sweep + ' ' + pathWidth + ',0';
      var svgHtml =
        '<svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(' +
        angle +
        'deg);"><path id="' +
        pathId +
        '" d="' +
        d +
        '" fill="none"></path><text style="font-size:' +
        size +
        'px; letter-spacing:' +
        spacing +
        'px;"><textPath href="#' +
        pathId +
        '">' +
        text +
        '</textPath></text></svg>';
      textIcon = L.divIcon({ className: 'text-label', html: svgHtml, iconAnchor: [0, 0] });
    } else {
      textIcon = L.divIcon({
        className: 'text-label',
        html:
          '<span style="font-size:' +
          size +
          'px; letter-spacing:' +
          spacing +
          'px; transform: rotate(' +
          angle +
          'deg);">' +
          text +
          '</span>',
        iconAnchor: [0, 0],
      });
    }
    labelMarker.setIcon(textIcon);
    labelMarker._baseFontSize = size;
    labelMarker._baseLetterSpacing = spacing;
    if (curve) {
      labelMarker._baseCurve = curve;
      labelMarker._basePathWidth = pathWidth;
    } else {
      delete labelMarker._baseCurve;
      delete labelMarker._basePathWidth;
    }
    data.text = text;
    data.description = description;
    data.size = size;
    data.angle = angle;
    data.spacing = spacing;
    data.curve = curve;
    saveTextLabels();
    rescaleTextLabels();
    cleanup();
  }

  function cancelHandler() {
    cleanup();
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
    document.getElementById('text-label-text').value = '';
    document.getElementById('text-label-description').value = '';
    document.getElementById('text-label-size').value = '14';
    document.getElementById('text-label-angle').value = '0';
    document.getElementById('text-letter-spacing').value = '0';
    document.getElementById('text-curve-radius').value = '0';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

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
            showTextForm(e.latlng);
          });
        });
      return container;
    },
  });

var AddPolygonControl = L.Control.extend({
  options: { position: 'topleft' },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar');
    var link = L.DomUtil.create('a', '', container);
    link.id = 'add-polygon-btn';
    link.href = '#';
    link.title = 'Add Polygon';
    link.innerHTML = '■';
    L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
      .on(link, 'click', L.DomEvent.preventDefault)
      .on(link, 'click', function () {
        var coordsInput = prompt('Enter polygon coordinates as lat,lng;lat,lng;...');
        if (!coordsInput) return;
        var coords = coordsInput.split(';').map(function (pair) {
          var parts = pair.split(',').map(Number);
          return [parts[0], parts[1]];
        });
        var name = prompt('Enter territory name:') || 'Territory';
        var description = prompt('Enter description:') || '';
        var color = prompt('Enter hex color for polygon:', '#3388ff') || '#3388ff';
        var data = {
          name: name,
          description: description,
          coords: coords,
          style: { color: color, fillColor: color, fillOpacity: 0.3 },
        };
        addPolygonToMap(data);
        customPolygons.push(data);
        savePolygons();
      });
    return container;
  },
});

map.addControl(new AddTextControl());
map.addControl(new AddPolygonControl());



