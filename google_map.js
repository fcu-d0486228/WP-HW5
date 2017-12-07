// https://tutorials.webduino.io/zh-tw/docs/socket/useful/google-map-1.html
// https://developers.google.com/maps/documentation/javascript/infowindows?hl=zh-tw
function initMap() {
	// marker list
	var markers = [];
	// icons of each marker
	var icons = {
		postOffice: {
			name: 'Post-Office',
			icon: './image/post-office_resize.png'
		},
		gasStation: {
			name: 'Gas-Station',
			icon: './image/gas-station_resize.png'
		}
	};
	// all places list
	var places = getPlaces();
	// lantitude and longtitude location list
	var locations = geocoderAddress(places);
	// content string list of each infomation window
	var infoString = concatInfoString(places);
	// infomation wimdows list
	var infoWindows = generateInfoWindow(infoString);
	// api to parse address to latitude and longitude
	//var geocoder = new google.maps.Geocoder();
	// map initial center
	var initCenter = new google.maps.LatLng(24.178816, 120.646705); // FCU

	// new google map
	var map = new google.maps.Map(document.getElementById('map'), {
		center: initCenter,
		zoom: 13,
		mapTypeId: 'roadmap'
	});

	mapMark(map, initCenter, places, locations, infoWindows);
}

// get all post offices and gas stations in Xitun
function getPlaces() {
	// post office info list
	var postOffices = [
		{
			address: '40704臺中市西屯區臺灣大道4段1727號(東海大學內)‎',
			title: '東海大學郵局(臺中5支)',
			phone: '(04)2359-2748',
			time: ' ',
			position: new google.maps.LatLng(24.1815869, 120.60312199999998),
			type: 'postOffice'
		}, {
			address: '40744臺中市西屯區河南路2段268號‎',
			title: '臺中逢甲郵局(臺中25支)',
			phone: '(04)2452-7033',
			time: ' ',
			position: new google.maps.LatLng(24.175272, 120.649134),
			type: 'postOffice'
		}, {
			address: '40760臺中市西屯區黎明路3段130號‎',
			title: '臺中西屯郵局(臺中30支)',
			phone: '(04)2701-0016',
			time: ' ',
			position: new google.maps.LatLng(24.1766902, 120.63764270000001),
			type: 'postOffice'
		}, {
			address: '40746臺中市西屯區青海路1段83號',
			title: '臺中何厝郵局(臺中44支)',
			phone: '(04)2316-0166',
			time: ' ',
			position: new google.maps.LatLng(24.1646942, 120.65424009999992),
			type: 'postOffice'
		}, {
			address: '40755臺中市西屯區工業區六路10號',
			title: '臺中工業區郵局(臺中46支)',
			phone: '(04)2359-2387',
			time: ' ',
			position: new google.maps.LatLng(24.1699279,120.6064543),
			type: 'postOffice'
		}, {
			address: '40705臺中市西屯區臺灣大道4段1650號(台中榮總內)',
			title: '臺中榮總郵局(臺中52支)',
			phone: '(04)2359-3263',
			time: ' ',
			position: new google.maps.LatLng(24.1839262, 120.60468620000006),
			type: 'postOffice'
		}, {
			address: '40763臺中市西屯區永安里西屯路3段166-80號',
			title: '臺中永安郵局(臺中61支)',
			phone: '(04)2461-5479',
			time: ' ',
			position: new google.maps.LatLng(24.1906027, 120.61234749999994),
			type: 'postOffice'
		}, {
			address: '40759臺中市西屯區大隆路60號',
			title: '臺中大隆路郵局(臺中67支)',
			phone: '(04)2320-6379',
			time: ' ',
			position: new google.maps.LatLng(24.1565319, 120.65286700000001),
			type: 'postOffice'
		}, {
			address: '40764臺中市西屯區福順路318號',
			title: '臺中福安郵局(臺中69支)',
			phone: '(04)2463-0618',
			time: ' ',
			position: new google.maps.LatLng(24.1834782, 120.61855850000006),
			type: 'postOffice'
		}, {
			address: '40757西屯區臺灣大道3段366號1樓',
			title: '臺中第3郵政代辦所',
			phone: '(04)-27015586',
			time: ' ',
			position: new google.maps.LatLng(24.1665835, 120.64314409999997),
			type: 'postOffice'
		}, {
			address: '40763臺中市西屯區中科路1號',
			title: '臺中第6郵政代辦所',
			phone: '(04)-24608800-2160',
			time: ' ',
			position: new google.maps.LatLng(24.2085787, 120.61408089999998),
			type: 'postOffice'
		}
	];
	// gas station info list
	var gasStations = [
		{
			address: '臺中市西屯區福和里臺灣大道四段1047號',
			title: '中油台中工業區加油加氣站(自營站)',
			phone: '(04)-23592968',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1830819, 120.61459330000002),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區青海路二段211號',
			title: '中油青海路站(自營站)',
			phone: '(04)-27015054',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1713234, 120.64392999999995),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區文心路三段2號',
			title: '中油文心路站(自營站)',
			phone: '(04)-23131239',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1635083, 120.65046789999997),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福聯里臺灣大道四段1832號',
			title: '中油東大(加盟站)',
			phone: '(04)-23599998',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.182917, 120.60132900000008),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區安和路51-8號',
			title: '中油安和(加盟站)',
			phone: '(04)-23598000',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.166172, 120.61896300000001),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區河南路二段341號',
			title: '中油河南路(加盟站)',
			phone: '(04)-27073666',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1721424, 120.64540119999992),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區中清路三段150號',
			title: '中油中清站(加盟站)',
			phone: '(04)-24258318',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.2081725, 120.65132419999998),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福聯里臺灣大道五段142號1樓',
			title: '中油大度山(加盟站)',
			phone: '(04)-23594311',
			time: '07:00~22:30',
			position: new google.maps.LatLng(24.1844179, 120.59036779999997),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區廣福路191號',
			title: '中油光明路(加盟站)',
			phone: '(04)-27051398',
			time: '06:00-24:00',
			position: new google.maps.LatLng(24.1983873, 120.64257889999999),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區中清路三段1號',
			title: '中油員村中清路(加盟站)',
			phone: '(04)-24263488',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.2081756, 120.65102580000007),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福雅路300號',
			title: '中油長安(加盟站)',
			phone: '(04)-24632260',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.192622, 120.62316599999997),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區工業八路2號',
			title: '中油年豐棧(加盟站)',
			phone: '(04)-23591798',
			time: '07:00-21:00(備註：每週日、國定假日公休；週六 12:00~18:00)',
			position: new google.maps.LatLng(24.174953, 120.60431990000006),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路3段800號',
			title: '中油安祥(加盟站)',
			phone: '(04)-22548448',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1628253, 120.62839429999997),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福康路199號',
			title: '中油北基世貿(加盟站)',
			phone: '(04)-24653499',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1874209, 120.61839669999995),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福科路110號',
			title: '中油光凰(加盟站)',
			phone: '(04)-27067358',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.180119, 120.63249199999996),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區文心路3段187號',
			title: '中油文華(加盟站)',
			phone: '(04)-23156811',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.171489, 120.65982400000007),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區台灣大道2段917號',
			title: '中油北基中港(加盟站)',
			phone: '(04)-23191958',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1618038, 120.65049620000002),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區林厝里東大路一段1220號',
			title: '中油中科(加盟站)',
			phone: '(04)-24626507',
			time: '06:30-20:30',
			position: new google.maps.LatLng(24.2012093, 120.60997139999995),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路二段698號',
			title: '中油統一精工廣福(加盟站)',
			phone: '(04)-27060039',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.1951644, 120.64425649999998),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路一段2490號',
			title: '中油恩光中清交流道(加盟站)',
			phone: '(04)-24267111',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.2007819, 120.65697599999999),
			type: 'gasStation'
		}, {
			address: '臺中市西屯區林厝里福雅路693號',
			title: '中油福雅加油站(加盟站)',
			phone: '(04)-24635458',
			time: '00:00~24:00',
			position: new google.maps.LatLng(24.2051471, 120.6290841),
			type: 'gasStation'
		}
	];

	// all places list
	var places = postOffices.concat(gasStations);
	return places;
}

// generate infomation string
function concatInfoString(places) {
	var infoString = [];
	places.forEach(function(place) {
		var string = '<h2>' + place.title + '</h2><p>' + 
			place.address + '<br>' + place.phone + 
			'<br>' + place.time + '</p>';
		infoString.push(string);
	});
	return infoString;
}

function generateInfoWindow(infoString) {
	var infoWindows = [];
	infoString.forEach(function(string) {
		var infoWindow = new google.maps.InfoWindow({
			content: string
		});
		infoWindows.push(infoWindow);
	});
	return infoWindows;
}

// use google geocoder api to convert address to location
function geocoderAddress(places) {
	var locations = [];
	// api to parse address to latitude and longitude
	var geocoder = new google.maps.Geocoder();
	places.forEach(function(place) {
		geocoder.geocode({
				'address': place.address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					// if status is OK, get the location
					locations.push(results[0].geometry.location);
					// sleep(1500);
				} else {
					// alert('【' + status + '】');
					locations.push(place.position);
				}
			}
		);
	});
	return locations;
}

// generate marker and infomation windows
function mapMark(map, initCenter, places, locations, infoWindows) {
	// marker list
	var markers = [];
	// icons of each marker
	var icons = {
		postOffice: {
			name: 'Post-Office',
			icon: './image/post-office_resize.png'
		},
		gasStation: {
			name: 'Gas-Station',
			icon: './image/gas-station_resize.png'
		}
	};

	// set marker
	places.forEach(function(place, i) {
			var marker;
			if (place.type == 'postOffice') {
				marker = {
					position: place.position,
					map: map,
					icon: icons.postOffice.icon
				};
			} else if (place.type == 'gasStation') {
				marker = {
					position: place.position,
					map: map,
					icon: icons.gasStation.icon
				};
			}
			markers[i] = new google.maps.Marker(marker);
			markers[i].setMap(map);
			// add event for that show the infomation window when is mouseover
			markers[i].addListener('mouseover', function() {
				infoWindows[i].open(map, markers[i]);
			});
			// add event for that close the infomation window when is mouseout
			markers[i].addListener('mouseout', function() {
				infoWindows[i].close();
			});
		}
	);

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

function sleep(milliseconds) {
	var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}