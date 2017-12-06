// https://tutorials.webduino.io/zh-tw/docs/socket/useful/google-map-1.html
// https://developers.google.com/maps/documentation/javascript/infowindows?hl=zh-tw
function initMap() {
	var fcu = {lat: 24.181635, lng: 120.646415};
	var map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 16,
			center: fcu,
			mapTypeId: 'roadmap'
		});

	var marker = new google.maps.Marker({
		position: fcu,
		map: map,
		title: 'FCU'
	});

	//var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = {
		postOffice: {
			name: 'Post-Office',
			icon: './image/post-office.png'
		},
		gasStation: {
			name: 'Gas-Station',
			icon: './image/gas-station.jpg'
		}
	};

	var features = [
		{
			position: new google.maps.LatLng(24.175272,120.649134),
			type: 'postOffice'
		}, {
			position: new google.maps.LatLng(24.172142,120.645401),
			type: 'gasStation'
		}
	];

	// info window
	var infoString = [
		{content: '<h2>台中逢甲郵局</h2><p>407台中市西屯區河南路2段268號</p>'},
		{content: '<h2>台灣中油河南路站</h2><p>407台中市西屯區河南路二段341號</p>'}
	];

	var infowindow = []
	infoString.forEach(function(info) {
		infowindow = new google.maps.InfoWindow({
			content: info.content
		});
	});

	// Create markers.
	features.forEach(function(feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: icons[feature.type].icon,
			map: map
		});

		feature.addListener('mouseover', function() {
			infowindow.open(map, feature);
		});
	});

	var legend = document.getElementById('legend');
	for (var key in icons) {
		var type = icons[key];
		var name = type.name;
		var icon = type.icon;
		var div = document.createElement('div');
		div.innerHTML = '<img src="' + icon + '"> ' + name;
		legend.appendChild(div);
	}
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}