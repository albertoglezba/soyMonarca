$(document).ready(function() {

	// Mapa de Google "Hybrid"
	var GHM_layer = L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',{
		subdomains:['mt0','mt1','mt2','mt3'],
		zIndex: 3,
		noWrap: true
	});
	
	// Para poner las capas iniciales de los mapas
	var baseMaps = {
		"Open Street Maps": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{zIndex: 1,noWrap: true}),
		"Vista de terreno": L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3'],zIndex: 2,noWrap: true}),
		"Vista Híbrida": GHM_layer
	};
	
	// Localidad de masomenos Toluca y alrededores
	var place = [19.29478848, -99.65630269];
	
	// Control para pantalla completa
	var fullscreen = L.control.fullscreen({
		position: 'topleft',
		title: 'Pantalla completa',
		titleCancel: 'Salir de pantalla completa'
	});
	
	// Ícono para mariposas
	var monarcaIcon = L.icon({
		iconUrl: '../_imgs/monarca_icon.png',
		iconSize:     [44, 30], // size of the icon
		iconAnchor:   [22, 15], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
	});
	
	
	//Cargando cada uno de los KML convertidos a geoJSON
	var a = L.geoJSON(null,{
		onEachFeature: function(feature, layer){
			layer.bindPopup(feature.properties.Name);
		},
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: monarcaIcon});
		}
	});
	$.getJSON("../_maps/Colonias_de_Mariposas.json", function(json){
		a.addData(json);
	});
	
	var b = L.geoJSON(null,{
		onEachFeature: function(feature, layer){
			layer.bindPopup("<h4>"+feature.properties.Name+"</h4>"+feature.properties.Description);
		},
	});
	$.getJSON("../_maps/APPF_Nevado_de_Toluca.json", function(json){
		b.addData(json);
	});
	
	var c = L.geoJSON(null,{
		onEachFeature: function(feature, layer){
			layer.bindPopup("<h4>"+feature.properties.Name+"</h4>"+feature.properties.Description);
		},
	});
	$.getJSON("../_maps/RB_Mariposa_Monarca.json", function(json){
		c.addData(json);
	});
	
	var d = L.geoJSON(null,{
		onEachFeature: function(feature, layer){
			layer.bindPopup("<h4>"+feature.properties.Name+"</h4>"+feature.properties.Description);
		},
	});
	$.getJSON("../_maps/PN_Izta-Popo.json", function(json){
		d.addData(json);
	});
	
	// Para poner los títulos de los KML convertidos y crear el control de dichas capitas
	var overlayMaps = {
		"Colonias de Mariposas": a,
		"APPF Nevado de Toluca": b,
		"Reserva de la Biósfera de la Mariposa Monarca": c,
		"Iztaccihuatl-Popopcatepetl":d
	};
	
	//Iniciando el mapa
	var map = L.map('map', {
		zoomControl: true,
		doubleClickZoom: false,
		layers: [GHM_layer, a]
	});
	
	map.addControl(fullscreen);
	map.setView(place, 9);  // Default place and zoom
	
	L.control.layers(baseMaps).addTo(map);
	L.control.layers(null, overlayMaps, {collapsed: false, position: 'bottomleft'}).addTo(map);
	
});
