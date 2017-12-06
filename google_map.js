// https://tutorials.webduino.io/zh-tw/docs/socket/useful/google-map-1.html
// https://developers.google.com/maps/documentation/javascript/infowindows?hl=zh-tw
function initMap() {
	// marker list
	var markers = [];
	// all places list
	var places = getPlaces();
	// icons of each marker
	var icons = {
		postOffice: {
			name: 'Post-Office',
			icon: './image/post-office.png'
		},
		gasStation: {
			name: 'Gas-Station',
			icon: './image/gas-station_resize.png'
		}
	};
	// infomation wimdows list
	var infoWindows = [];
	// content string list of each infomation window
	var infoString = concatInfoString(places);
	// api to parse address to latitude and longitude
	var geocoder = new google.maps.Geocoder();
	// map initial center
	var initCenter = '逢甲大學'

	// geocoder main function
	function _geocoder(address, callback) {
		geocoder.geocode({
			address: address
			}, function(results, status) {
				// status OK means get successfully
				if (status == google.maps.GeocoderStatus.OK) {
					// store the latitude and longtitude location
					var loaction = results[0].geometry.location;
					callback(loaction);
				}
			}
		);
	}

	// use address or name to generate the map with marker
	_geocoder(initCenter, function(address) {
		// new google map
		var map = new google.maps.Map(document.getElementById('map'), {
			center: address,
			zoom: 13,
			mapTypeId: 'roadmap'
		});

		// set the content of infomation window
		infoString.forEach(function(string) {
			var infoWindow = new google.maps.InfoWindow({
				content: string
			});
			infoWindows.push(infoWindow);
		});

		// mark the marker using geocoder
		places.forEach(function(place, i){
			_geocoder(place.address, function(address) {
				var marker;
				if (place.type == 'postOffice') {
					marker = {
						position: address,
						map: map,
						icon: icons.postOffice.icon
					};
				} else if (place.type == 'gasStation') {
					marker = {
						position: address,
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
			});
		});
	});
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
			type: 'postOffice'
		}, {
			address: '40744臺中市西屯區河南路2段268號‎',
			title: '臺中逢甲郵局(臺中25支)',
			phone: '(04)2452-7033',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40760臺中市西屯區黎明路3段130號‎',
			title: '臺中西屯郵局(臺中30支)',
			phone: '(04)2701-0016',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40746臺中市西屯區青海路1段83號',
			title: '臺中何厝郵局(臺中44支)',
			phone: '(04)2316-0166',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40755臺中市西屯區工業區六路10號',
			title: '臺中工業區郵局(臺中46支)',
			phone: '(04)2359-2387',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40705臺中市西屯區臺灣大道4段1650號(台中榮總內)',
			title: '臺中榮總郵局(臺中52支)',
			phone: '(04)2359-3263',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40763臺中市西屯區永安里西屯路3段166-80號',
			title: '臺中永安郵局(臺中61支)',
			phone: '(04)2461-5479',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40759臺中市西屯區大隆路60號',
			title: '臺中大隆路郵局(臺中67支)',
			phone: '(04)2320-6379',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40764臺中市西屯區福順路318號',
			title: '臺中福安郵局(臺中69支)',
			phone: '(04)2463-0618',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40757西屯區臺灣大道3段366號1樓',
			title: '臺中第3郵政代辦所',
			phone: '(04)-27015586',
			time: ' ',
			type: 'postOffice'
		}, {
			address: '40763臺中市西屯區中科路1號',
			title: '臺中第6郵政代辦所',
			phone: '(04)-24608800-2160',
			time: ' ',
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
			type: 'gasStation'
		}, {
			address: '臺中市西屯區青海路二段211號',
			title: '中油青海路站(自營站)',
			phone: '(04)-27015054',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區文心路三段2號',
			title: '中油文心路站(自營站)',
			phone: '(04)-23131239',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福聯里臺灣大道四段1832號',
			title: '中油東大(加盟站)',
			phone: '(04)-23599998',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區安和路51-8號',
			title: '中油安和(加盟站)',
			phone: '(04)-23598000',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區河南路二段341號',
			title: '中油河南路(加盟站)',
			phone: '(04)-27073666',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區中清路三段150號',
			title: '中油中清站(加盟站)',
			phone: '(04)-24258318',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福聯里臺灣大道五段142號1樓',
			title: '中油大度山(加盟站)',
			phone: '(04)-23594311',
			time: '07:00~22:30',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區廣福路191號',
			title: '中油光明路(加盟站)',
			phone: '(04)-27051398',
			time: '06:00-24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區中清路三段1號',
			title: '中油員村中清路(加盟站)',
			phone: '(04)-24263488',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福雅路300號',
			title: '中油長安(加盟站)',
			phone: '(04)-24632260',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區工業八路2號',
			title: '中油年豐棧(加盟站)',
			phone: '(04)-23591798',
			time: '07:00-21:00(備註：每週日、國定假日公休；週六 12:00~18:00)',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路3段800號',
			title: '中油安祥(加盟站)',
			phone: '(04)-22548448',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福康路199號',
			title: '中油北基世貿(加盟站)',
			phone: '(04)-24653499',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區福科路110號',
			title: '中油光凰(加盟站)',
			phone: '(04)-27067358',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區文心路3段187號',
			title: '中油文華(加盟站)',
			phone: '(04)-23156811',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區台灣大道2段917號',
			title: '中油北基中港(加盟站)',
			phone: '(04)-23191958',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區林厝里東大路一段1220號',
			title: '中油中科(加盟站)',
			phone: '(04)-24626507',
			time: '06:30-20:30',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路二段698號',
			title: '中油統一精工廣福(加盟站)',
			phone: '(04)-27060039',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區環中路一段2490號',
			title: '中油恩光中清交流道(加盟站)',
			phone: '(04)-24267111',
			time: '00:00~24:00',
			type: 'gasStation'
		}, {
			address: '臺中市西屯區林厝里福雅路693號',
			title: '中油福雅加油站(加盟站)',
			phone: '(04)-24635458',
			time: '00:00~24:00',
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