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
// Overlay extracted from image and used for OCR/template matching
// Use world bounds so the overlay spans the entire map
var overlayBounds = [[-85, -180], [85, 180]];
// User-supplied overlay image should be placed at overlays/overlay.png
L.imageOverlay('overlays/overlay.png', overlayBounds).addTo(map);
tiles.once('load', function () {
  baseZoom = map.getZoom();
  rescaleIcons();
  rescaleTextLabels();
});

var mouseCoords = document.getElementById('mouse-coords');

map.on('mousemove', function (e) {
  mouseCoords.textContent = e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4);
});

map.on('mouseout', function () {
  mouseCoords.textContent = '';
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
  var fishingIconPath = 'icons/fish.png';
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
var territoriesLayer = L.featureGroup();
var territoryMarkersLayer = L.layerGroup();
var Settlements = L.layerGroup();
var territoriesOverlay = L.layerGroup([territoriesLayer, territoryMarkersLayer]);

Settlements.addTo(map);
territoriesOverlay.addTo(map);

var markerOverlayGroups = {
  Settlements: Settlements,
  Territories: territoryMarkersLayer,
};

var overlays = {
  Settlements: Settlements,
  Territories: territoriesOverlay,
};

function populateOverlayOptions(select) {
  if (!select) return;
  select.innerHTML = '';
  var defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'None';
  select.appendChild(defaultOption);
  Object.keys(markerOverlayGroups).forEach(function (name) {
    var option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

populateOverlayOptions(document.getElementById('marker-overlay'));
populateOverlayOptions(document.getElementById('text-overlay'));
L.control.layers(null, overlays).addTo(map);

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

// Parse a single CSV row into an array of values
function parseCsvRow(line) {
  var result = [];
  var cur = '';
  var inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        result.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
  }
  result.push(cur);
  return result;
}

// Convert the CSV text into feature objects
function loadFeaturesFromCSV(text) {
  var markers = [];
  var textLabels = [];
  var polygons = [];
  var lines = text.trim().split(/\r?\n/);
  lines.slice(1).forEach(function (line) {
    if (!line.trim()) return;
    var cols = parseCsvRow(line);
    var type = cols[0];
    if (type === 'marker') {
      markers.push({
        lat: parseFloat(cols[1]),
        lng: parseFloat(cols[2]),
        icon: cols[3] || 'wigwam',
        name: cols[4],
        description: cols[6],
        style: cols[12] ? JSON.parse(cols[12]) : undefined,
        overlay: cols[13] || '',
      });
    } else if (type === 'text') {
      textLabels.push({
        lat: parseFloat(cols[1]),
        lng: parseFloat(cols[2]),
        text: cols[5],
        description: cols[6],
        size: parseFloat(cols[7]) || 14,
        angle: parseFloat(cols[8]) || 0,
        spacing: parseFloat(cols[9]) || 0,
        curve: parseFloat(cols[10]) || 0,
        overlay: cols[13] || '',
      });
    } else if (type === 'polygon') {
      polygons.push({
        name: cols[4],
        description: cols[6],
        coords: cols[11] ? JSON.parse(cols[11]) : [],
        style: cols[12] ? JSON.parse(cols[12]) : undefined,
      });
    }
  });
  return { markers: markers, textLabels: textLabels, polygons: polygons };
}

function exportFeaturesToCSV() {
  function escapeCsv(val) {
    if (val === undefined || val === null) return '';
    var str = String(val).replace(/"/g, '""');
    return /[",\n]/.test(str) ? '"' + str + '"' : str;
  }

  var rows = [
    'type,lat,lng,icon,name,text,description,size,angle,spacing,curve,coords,style,overlay'
  ];

  customMarkers.forEach(function (m) {
    rows.push(
      [
        'marker',
        escapeCsv(m.lat),
        escapeCsv(m.lng),
        escapeCsv(m.icon),
        escapeCsv(m.name),
        '',
        escapeCsv(m.description),
        '',
        '',
        '',
        '',
        '',
        escapeCsv(JSON.stringify(m.style || {})),
        escapeCsv(m.overlay || '')
      ].join(',')
    );
  });

  customTextLabels.forEach(function (t) {
    rows.push(
      [
        'text',
        escapeCsv(t.lat),
        escapeCsv(t.lng),
        '',
        '',
        escapeCsv(t.text),
        escapeCsv(t.description),
        escapeCsv(t.size),
        escapeCsv(t.angle),
        escapeCsv(t.spacing),
        escapeCsv(t.curve),
        '',
        '',
        escapeCsv(t.overlay || '')
      ].join(',')
    );
  });

  customPolygons.forEach(function (p) {
    rows.push(
      [
        'polygon',
        '',
        '',
        '',
        escapeCsv(p.name),
        '',
        escapeCsv(p.description),
        '',
        '',
        '',
        '',
        escapeCsv(JSON.stringify(p.coords)),
        escapeCsv(JSON.stringify(p.style || {})),
        ''
      ].join(',')
    );
  });

  var csvContent = rows.join('\n');

  // Try posting to a server endpoint; fall back to client-side download
  fetch('/save-features', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: btoa(csvContent) })
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Server rejected save');
      }
    })
    .catch(function () {
      var blob = new Blob([csvContent], { type: 'text/csv' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'features.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

function saveMarkers() {
  updateEditToolbar();
}

function saveTextLabels() {
  updateEditToolbar();
}

function savePolygons() {
  updateEditToolbar();
}

function updateEditToolbar() {
  if (drawControl && drawControl._toolbars && drawControl._toolbars.edit) {
    drawControl._toolbars.edit._checkDisabled();
  }
}

function setPolygonPopup(poly) {
  var data = poly._data;
  var isCustom = customPolygons.includes(data);
  var html =
    '<b>' +
    (data.name || '') +
    '</b>' +
    (data.description ? '<br>' + data.description : '');
  if (isCustom) {
    html += '<br><a href="#" class="polygon-edit-link">Edit</a>';
  }
  poly.bindPopup(html);
  poly.off('popupopen');
  poly.on('popupopen', function (e) {
    var link = e.popup._contentNode.querySelector('.polygon-edit-link');
    if (link) {
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        editPolygonForm(poly);
      });
    }
  });
}

function editPolygonForm(poly) {
  if (!poly || !poly._data) return;
  var data = poly._data;
  var name = prompt('Enter territory name:', data.name || 'Territory') || data.name;
  var description = prompt('Enter description:', data.description || '') || data.description;
  var color =
    prompt('Enter hex color for polygon:', (data.style && data.style.color) || '#3388ff') ||
    (data.style && data.style.color) ||
    '#3388ff';
  data.name = name;
  data.description = description;
  data.style = { color: color, fillColor: color, fillOpacity: 0.3 };
  poly.setStyle(data.style);
  setPolygonPopup(poly);
  if (customPolygons.includes(data)) {
    savePolygons();
  }
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
  var poly = L.polygon(data.coords, opts).addTo(territoriesLayer);
  poly._data = data;
  setPolygonPopup(poly);
  poly.on('contextmenu', function () {
    territoriesLayer.removeLayer(poly);
    customPolygons = customPolygons.filter(function (p) {
      return p !== data;
    });
    savePolygons();
    updateEditToolbar();
  });
  updateEditToolbar();
  return poly;
}

function getMarkerOverlayLayer(name) {
  if (!name) return null;
  return markerOverlayGroups[name] || null;
}

function moveMarkerToOverlay(marker, overlayName) {
  if (!marker) return;
  var normalized = overlayName || '';
  var newLayer = getMarkerOverlayLayer(normalized);
  var currentLayer = marker._overlayLayer || null;
  var currentName = marker._overlayName || '';
  if (currentLayer === newLayer && currentName === normalized) {
    marker._overlayName = normalized;
    if (marker._data) {
      marker._data.overlay = normalized;
    }
    return;
  }
  if (currentLayer) {
    currentLayer.removeLayer(marker);
  } else if (marker._overlayLayer !== undefined) {
    map.removeLayer(marker);
  }
  if (newLayer) {
    newLayer.addLayer(marker);
  } else {
    marker.addTo(map);
  }
  marker._overlayLayer = newLayer;
  marker._overlayName = normalized;
  if (marker._data) {
    marker._data.overlay = normalized;
  }
}

function detachMarker(marker) {
  if (!marker) return;
  if (marker._overlayLayer) {
    marker._overlayLayer.removeLayer(marker);
  } else {
    map.removeLayer(marker);
  }
  marker._overlayLayer = null;
  marker._overlayName = '';
}

function addMarkerToMap(data) {
  var icon = iconMap[data.icon] || WigwamIcon;
  var customMarker = createMarker(
    data.lat,
    data.lng,
    icon,
    data.name,
    data.description
  );
  var overlayName = data.overlay || '';
  var targetLayer = getMarkerOverlayLayer(overlayName);
  if (targetLayer) {
    targetLayer.addLayer(customMarker);
  } else {
    customMarker.addTo(map);
  }
  customMarker._overlayLayer = targetLayer || null;
  customMarker._overlayName = overlayName;
  data.overlay = overlayName;
  customMarker._data = data;
  customMarker.on('contextmenu', function () {
    detachMarker(customMarker);
    customMarkers = customMarkers.filter(function (m) {
      return !(m.lat === data.lat && m.lng === data.lng && m.name === data.name);
    });
    saveMarkers();
  });
  rescaleIcons();
  return customMarker;
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
  var m = L.marker([data.lat, data.lng], { icon: textIcon, draggable: true });

  m
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
      detachMarker(m);
      customTextLabels = customTextLabels.filter(function (t) {
        return !(
          t.lat === data.lat &&
          t.lng === data.lng &&
          t.text === data.text &&
          t.size === data.size &&
          t.description === data.description &&
          t.angle === data.angle &&
          t.spacing === data.spacing &&
          (t.curve || 0) === (data.curve || 0) &&
          (t.overlay || '') === (data.overlay || '')
        );
      });
      allTextLabels = allTextLabels.filter(function (t) {
        return t !== m;
      });
      saveTextLabels();
    });

  data.overlay = data.overlay || '';
  var overlayName = data.overlay;
  var targetLayer = getMarkerOverlayLayer(overlayName);
  if (targetLayer) {
    targetLayer.addLayer(m);
  } else {
    m.addTo(map);
  }
  m._overlayLayer = targetLayer || null;
  m._overlayName = overlayName;
  m._baseFontSize = data.size;
  m._baseLetterSpacing = data.spacing;
  if (data.curve) {
    m._baseCurve = data.curve;
    m._basePathWidth = pathWidth;
  }
  m._data = data;
  allTextLabels.push(m);
  rescaleTextLabels();
  return m;
}

// Always load features from CSV
fetch('data/features.csv')
  .then(function (r) {
    return r.text();
  })
  .then(function (csv) {
    var parsed = loadFeaturesFromCSV(csv);
    parsed.markers.forEach(function (m) {
      customMarkers.push(m);
      addMarkerToMap(m);
    });
    parsed.textLabels.forEach(function (t) {
      customTextLabels.push(t);
      addTextLabelToMap(t);
    });
    parsed.polygons.forEach(function (p) {
      customPolygons.push(p);
      addPolygonToMap(p);
    });
  })
  .catch(function (err) {
    console.error('Failed to load features.csv', err);
  });


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
// ******END OF MARKERS DECLARATION ******

map.on('zoomend', rescaleIcons);
map.on('zoomend', rescaleTextLabels);

function showPolygonForm(tempLayer) {
  var overlay = document.getElementById('polygon-form-overlay');
  var saveBtn = document.getElementById('polygon-save');
  var cancelBtn = document.getElementById('polygon-cancel');
  overlay.classList.remove('hidden');

  function submitHandler() {
    var name = document.getElementById('polygon-name').value || 'Territory';
    var description = document.getElementById('polygon-description').value || '';
    var color = document.getElementById('polygon-color').value || '#3388ff';
    var coords = tempLayer.getLatLngs()[0].map(function (latlng) {
      return [latlng.lat, latlng.lng];
    });
    var data = {
      name: name,
      description: description,
      coords: coords,
      style: { color: color, fillColor: color, fillOpacity: 0.3 },
    };
    customPolygons.push(data);
    addPolygonToMap(data);
    savePolygons();
    map.removeLayer(tempLayer);
    cleanup();
  }

  function cancelHandler() {
    map.removeLayer(tempLayer);
    cleanup();
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
    document.getElementById('polygon-name').value = '';
    document.getElementById('polygon-description').value = '';
    document.getElementById('polygon-color').value = '#3388ff';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

function showMarkerForm(latlng) {
  var overlay = document.getElementById('marker-form-overlay');
  var saveBtn = document.getElementById('marker-save');
  var cancelBtn = document.getElementById('marker-cancel');
  var convertBtn = document.getElementById('marker-convert');
  var overlaySelect = document.getElementById('marker-overlay');
  overlay.classList.remove('hidden');
  convertBtn.classList.add('hidden');
  if (overlaySelect) {
    overlaySelect.value = '';
  }

  function submitHandler() {
    var name = document.getElementById('marker-name').value || 'Marker';
    var description =
      document.getElementById('marker-description').value || '';
    var iconKey = document.getElementById('marker-icon').value || 'wigwam';
    var overlayValue = overlaySelect ? overlaySelect.value : '';
    var data = {
      lat: latlng.lat,
      lng: latlng.lng,
      name: name,
      description: description,
      icon: iconKey,
      overlay: overlayValue || '',
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
    convertBtn.classList.add('hidden');
    document.getElementById('marker-name').value = '';
    document.getElementById('marker-description').value = '';
    document.getElementById('marker-icon').value = 'wigwam';
    if (overlaySelect) {
      overlaySelect.value = '';
    }
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

function editMarkerForm(marker) {
  if (!marker || !marker._data) return;
  var overlay = document.getElementById('marker-form-overlay');
  var saveBtn = document.getElementById('marker-save');
  var cancelBtn = document.getElementById('marker-cancel');
  var convertBtn = document.getElementById('marker-convert');
  var title = document.querySelector('#marker-form h3');
  var overlaySelect = document.getElementById('marker-overlay');
  overlay.classList.remove('hidden');
  convertBtn.classList.remove('hidden');

  document.getElementById('marker-name').value = marker._data.name || '';
  document.getElementById('marker-description').value = marker._data.description || '';
  document.getElementById('marker-icon').value = marker._data.icon || 'wigwam';
  if (overlaySelect) {
    overlaySelect.value = marker._data.overlay || '';
  }
  if (title) title.textContent = 'Edit Marker';

  function submitHandler() {
    var name = document.getElementById('marker-name').value || 'Marker';
    var description = document.getElementById('marker-description').value || '';
    var iconKey = document.getElementById('marker-icon').value || 'wigwam';
    var overlayValue = overlaySelect ? overlaySelect.value : '';

    marker._data.name = name;
    marker._data.description = description;
    marker._data.icon = iconKey;

    var newIcon = iconMap[iconKey] || WigwamIcon;
    marker.setIcon(newIcon);
    marker._baseIconOptions = JSON.parse(JSON.stringify(newIcon.options));
    moveMarkerToOverlay(marker, overlayValue);
    rescaleIcons();
    saveMarkers();
    cleanup();
  }

  function cancelHandler() {
    cleanup();
  }

  function convertHandler() {
    cleanup();
    convertMarkerToText(marker);
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
     convertBtn.removeEventListener('click', convertHandler);
    document.getElementById('marker-name').value = '';
    document.getElementById('marker-description').value = '';
    document.getElementById('marker-icon').value = 'wigwam';
    if (overlaySelect) {
      overlaySelect.value = '';
    }
    convertBtn.classList.add('hidden');
    if (title) title.textContent = 'Add Marker';
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
  convertBtn.addEventListener('click', convertHandler);
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
  var convertBtn = document.getElementById('text-convert');
  var overlaySelect = document.getElementById('text-overlay');
  overlay.classList.remove('hidden');
  convertBtn.classList.add('hidden');
  if (overlaySelect) {
    overlaySelect.value = '';
  }

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
    var overlayValue = overlaySelect ? overlaySelect.value : '';
    var data = {
      lat: latlng.lat,
      lng: latlng.lng,
      text: text,
      description: description,
      size: size,
      angle: angle,
      spacing: spacing,
      curve: curve,
      overlay: overlayValue || '',
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
    convertBtn.classList.add('hidden');
    document.getElementById('text-label-text').value = '';
    document.getElementById('text-label-description').value = '';
    document.getElementById('text-label-size').value = '14';
    document.getElementById('text-label-angle').value = '0';
    document.getElementById('text-letter-spacing').value = '0';
    document.getElementById('text-curve-radius').value = '0';
    if (overlaySelect) {
      overlaySelect.value = '';
    }
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
}

function editTextForm(labelMarker) {
  if (!labelMarker || !labelMarker._data) return;
  var overlay = document.getElementById('text-form-overlay');
  var saveBtn = document.getElementById('text-save');
  var cancelBtn = document.getElementById('text-cancel');
  var convertBtn = document.getElementById('text-convert');
  var overlaySelect = document.getElementById('text-overlay');
  var data = labelMarker._data;

  document.getElementById('text-label-text').value = data.text || '';
  document.getElementById('text-label-description').value = data.description || '';
  document.getElementById('text-label-size').value = data.size || 14;
  document.getElementById('text-label-angle').value = data.angle || 0;
  document.getElementById('text-letter-spacing').value = data.spacing || 0;
  document.getElementById('text-curve-radius').value = data.curve || 0;
  overlay.classList.remove('hidden');
  convertBtn.classList.remove('hidden');
  if (overlaySelect) {
    overlaySelect.value = data.overlay || '';
  }

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
    var overlayValue = overlaySelect ? overlaySelect.value : '';

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
    data.overlay = overlayValue || '';
    moveMarkerToOverlay(labelMarker, overlayValue);
    saveTextLabels();
    rescaleTextLabels();
    cleanup();
  }

  function cancelHandler() {
    cleanup();
  }

  function convertHandler() {
    cleanup();
    convertTextToMarker(labelMarker);
  }

  function cleanup() {
    overlay.classList.add('hidden');
    saveBtn.removeEventListener('click', submitHandler);
    cancelBtn.removeEventListener('click', cancelHandler);
    convertBtn.removeEventListener('click', convertHandler);
    convertBtn.classList.add('hidden');
    document.getElementById('text-label-text').value = '';
    document.getElementById('text-label-description').value = '';
    document.getElementById('text-label-size').value = '14';
    document.getElementById('text-label-angle').value = '0';
    document.getElementById('text-letter-spacing').value = '0';
    document.getElementById('text-curve-radius').value = '0';
    if (overlaySelect) {
      overlaySelect.value = '';
    }
  }

  saveBtn.addEventListener('click', submitHandler);
  cancelBtn.addEventListener('click', cancelHandler);
  convertBtn.addEventListener('click', convertHandler);
}

function convertMarkerToText(marker) {
  if (!marker || !marker._data) return;
  if (selectedMarker === marker) {
    selectedMarker = null;
  }
  var data = marker._data;
  detachMarker(marker);
  customMarkers = customMarkers.filter(function (m) {
    return m !== data;
  });
  allMarkers = allMarkers.filter(function (m) {
    return m !== marker;
  });
  saveMarkers();

  var textData = {
    lat: data.lat,
    lng: data.lng,
    text: data.name || '',
    description: data.description || '',
    size: 14,
    angle: 0,
    spacing: 0,
    curve: 0,
    overlay: data.overlay || '',
  };
  customTextLabels.push(textData);
  var labelMarker = addTextLabelToMap(textData);
  saveTextLabels();
  editTextForm(labelMarker);
}

function convertTextToMarker(labelMarker) {
  if (!labelMarker || !labelMarker._data) return;
  if (selectedMarker === labelMarker) {
    selectedMarker = null;
  }
  var data = labelMarker._data;
  detachMarker(labelMarker);
  customTextLabels = customTextLabels.filter(function (t) {
    return t !== data;
  });
  allTextLabels = allTextLabels.filter(function (t) {
    return t !== labelMarker;
  });
  saveTextLabels();

  var markerData = {
    lat: data.lat,
    lng: data.lng,
    name: data.text || 'Marker',
    description: data.description || '',
    icon: 'wigwam',
    overlay: data.overlay || '',
  };
  customMarkers.push(markerData);
  var marker = addMarkerToMap(markerData);
  saveMarkers();
  editMarkerForm(marker);
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

map.addControl(new AddTextControl());

var drawControl = new L.Control.Draw({
  draw: {
    polygon: true,
    polyline: false,
    rectangle: false,
    circle: false,
    circlemarker: false,
    marker: false,
  },
  edit: {
    featureGroup: territoriesLayer,
  },
});
map.addControl(drawControl);
updateEditToolbar();

map.on(L.Draw.Event.CREATED, function (e) {
  if (e.layerType === 'polygon') {
    showPolygonForm(e.layer);
  }
});

map.on(L.Draw.Event.EDITED, function (e) {
  e.layers.eachLayer(function (layer) {
    if (customPolygons.includes(layer._data)) {
      layer._data.coords = layer
        .getLatLngs()[0]
        .map(function (latlng) {
          return [latlng.lat, latlng.lng];
        });
    }
  });
  savePolygons();
});

map.on(L.Draw.Event.DELETED, function (e) {
  e.layers.eachLayer(function (layer) {
    if (customPolygons.includes(layer._data)) {
      customPolygons = customPolygons.filter(function (p) {
        return p !== layer._data;
      });
    }
  });
  savePolygons();
  updateEditToolbar();
});

document.getElementById('save-changes').addEventListener('click', function () {
  exportFeaturesToCSV();
});


