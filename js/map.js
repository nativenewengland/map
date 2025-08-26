//Creating the Map
var map = L.map('map').setView([0, 0], 0);
L.tileLayer('map/{z}/{x}/{y}.png', {
  continuousWorld: false,
  noWrap: true,  
  minZoom: 2,
  maxZoom: 6,
}).addTo(map);
//Coordinate Finder
var marker = L.marker([0, 0], {
  draggable: true,
}).addTo(map);

  var citiesIcon = L.icon({
		iconUrl:       'icons/city.png',
		iconRetinaUrl: 'icons/city.png',
		shadowUrl:     'icons/shadow.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	});
  var CollegesIcon = L.icon({
		iconUrl:       'icons/templeCathedral.png',
		iconRetinaUrl: 'icons/templeShrine.png',
		shadowUrl:     'icons/shadow.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	});
  var TownsIcon = L.icon({
		iconUrl:       'icons/town.png',
		iconRetinaUrl: 'icons/town.png',
		shadowUrl:     'icons/shadow.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	});
  // Trading
  var TradingIcon = L.icon({
		iconUrl:       'icons/tradeCamp.png',
		iconRetinaUrl: 'icons/tradecamplarge.png',
		shadowUrl:     'icons/shadow.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	});
  
// //// START OF MARKERS
//  1. Mage Colleges MARKERS
var el_gulndar = L.marker([36.0135, -106.3916],{icon:TownsIcon}).bindPopup('<b>Gulndar</b>');
var el_teglhus = L.marker([44.4965, -100.7666],{icon:TradingIcon}).bindPopup('<b>Teglhus</b>');
var el_ochri_college = L.marker([48.5166,-103.4692],{icon:CollegesIcon}).bindPopup('<b>Ochri College</b>');
//  2.Trading post markers

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');
// var el_teglhus = L.marker([44.4965, -100.7666]).bindPopup('<b>Teglhus</b>');
// var el_ochri_college = L.marker([48.5166,-103.4692]).bindPopup('<b>Ochri College</b>');

//  3. Cities MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');
// var el_teglhus = L.marker([44.4965, -100.7666]).bindPopup('<b>Teglhus</b>');
// var el_ochri_college = L.marker([48.5166,-103.4692]).bindPopup('<b>Ochri College</b>');

//  4. Towns MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');
// var el_teglhus = L.marker([44.4965, -100.7666]).bindPopup('<b>Teglhus</b>');
// var el_ochri_college = L.marker([48.5166,-103.4692]).bindPopup('<b>Ochri College</b>');

//  5. Forts/Castles MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');
// var el_teglhus = L.marker([44.4965, -100.7666]).bindPopup('<b>Teglhus</b>');
// var el_ochri_college = L.marker([48.5166,-103.4692]).bindPopup('<b>Ochri College</b>');

//  6. Temples MARKERS

// var el_gulndar = L.marker([36.0135, -106.3916],{icon:citiesIcon}).bindPopup('<b>Gulndar</b>');
// var el_teglhus = L.marker([44.4965, -100.7666]).bindPopup('<b>Teglhus</b>');
// var el_ochri_college = L.marker([48.5166,-103.4692]).bindPopup('<b>Ochri College</b>');


// ******END OF MARKERS DECLARATION ******

// MARKER GROUPS
var Colleges = L.layerGroup([el_ochri_college])
// var Trading_Posts
var Cities = L.layerGroup([el_teglhus])
var Towns = L.layerGroup([el_gulndar])
// var Forts_Castles
// var Temples
// Marker overlay
var overlays= {
  // "GROUPNAME":mg_GROUPNAME
   "Colleges" : Colleges,
  //  "Trading/Posts" : Trading_Posts,
   "Cities" : Cities,
  //  "Forts/Castles" : Forts_Castles,
   "Towns" : Towns,
  //  "Temples" : Temples,
}

//GROUP CONTROLS
  L.control.layers(null, overlays).addTo(map);



marker.bindPopup('LatLng Marker').openPopup();
marker.on('dragend', function(e) {
  marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
});

map.on('zoomend', function (e) {
    console.log(e.target._zoom);
});
