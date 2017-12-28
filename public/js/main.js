
//SHOW LANDING MODAL	
	$('.modal').modal('show')
	$('.modal').on('shown.bs.modal', function() {
		$("#locationTextField").focus()
	})

	$('#modalCloseButton').hide()
	$('#searchLocationButton').show()
	$('#viewMapButton').hide()

	document.getElementById('focusWindow').style.visibility = "hidden"
  	
  	window.addEventListener('load', function(){

		console.log('map loaded')
	})

	var serverCalls = 0

	$(document).ajaxComplete(function(event, xhr, settings) {

		serverCalls++

		console.log('server calls: ', serverCalls)
	})

	// $(document).ajaxStart(function(event) {

	// 	console.log('ajax start event: ', event)
	// })
	

  	// $(document).ajaxComplete(function(event) {

  	// 	console.log('ajax complete event: ', event)
  	// 	console.log('ajax complete')
  	// })

//GLOBAL VARIABLES
	var map
	var place
	var insideText
	var parkingSearchCircle
	var centerMarker = null
	var centerMarkers = []

	var restaurantsMarkers
	var restaurantsMarkerCluster
	var restaurantsInfoWindows = []

	var entertainmentMarkers
	var entertainmentMarkerCluster
	var entertainmentInfoWindows = []

	var recreationMarkers
	var recreationMarkerCluster
	var recreationInfoWindows = []

	var shoppingMarkers
	var shoppingMarkerCluster
	var shoppingInfoWindows = []

	var placeMarkerLocation
	var placeMarkerInfo
	var placeMarkerParking
	var placeInfoWindow
	var placeInfoWindows = []
	
	var parkingSearchLat
	var parkingSearchLng
	var parkingMarkers = []

	var citySearchCircle

	var parkingInfoWindow
	var parkingInfoWindows = []


//INITIALIZE GOOGLE MAP =========================================================================================================================
	
	function initMap() {

		var retroStyle = new google.maps.StyledMapType(
			[
				{
					elementType: 'geometry',
					stylers: [{
						color: '#ebe3cd'
					}]
				},
				{
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#523735'
					}]
				},
				{
					elementType: 'labels.text.stroke',
					stylers: [{
						color: '#f5f1e6'
					}]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [{
						color: '#c9b2a6'
					}]
				},
				{
					featureType: 'administrative.land_parcel',
					elementType: 'geometry.stroke',
					stylers: [{
						color: '#dcd2be'
					}]
				},
				{
					featureType: 'administrative.land_parcel',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#ae9e90'
					}]
				},
				{
					featureType: 'landscape.natural',
					elementType: 'geometry',
					stylers: [{
						color: '#dfd2ae'
					}]
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [{
						color: '#dfd2ae'
					}]
				},
				{
					featureType: 'poi',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#93817c'
					}]
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry.fill',
					stylers: [{
						color: '#a5b076'
					}]
				},
				{
					featureType: 'poi.park',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#447530'
					}]
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [{
						color: '#f5f1e6'
					}]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [{
						color: '#fdfcf8'
					}]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [{
						color: '#f8c967'
					}]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [{
						color: '#e9bc62'
					}]
				},
				{
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry',
					stylers: [{
						color: '#e98d58'
					}]
				},
				{
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry.stroke',
					stylers: [{
						color: '#db8555'
					}]
				},
				{
					featureType: 'road.local',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#806b63'
					}]
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [{
						color: '#dfd2ae'
					}]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#8f7d77'
					}]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.stroke',
					stylers: [{
						color: '#ebe3cd'
					}]
				},
				{
					featureType: 'transit.station',
					elementType: 'geometry',
					stylers: [{
						color: '#dfd2ae'
					}]
				},
				{
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [{
						color: '#b9d3c2'
					}]
				},
				{
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [{
						color: '#92998d' 
					}]
				}
			], {
				name: 'Light'
			});

		var darkStyle = new google.maps.StyledMapType(

			[
		          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
		          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
		          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
		          {
		            featureType: 'administrative.locality',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#C7B3CE'}]
		          },
		          {
		            featureType: 'poi',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#CCC4CD'}]
		          },
		          {
		            featureType: 'poi.park',
		            elementType: 'geometry',
		            stylers: [{color: '#2D484C'}]
		          },
		          {
		            featureType: 'poi.park',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#6b9a76'}]
		          },
		          {
		            featureType: 'road',
		            elementType: 'geometry',
		            stylers: [{color: '#38414e'}]
		          },
		          {
		            featureType: 'road',
		            elementType: 'geometry.stroke',
		            stylers: [{color: '#212a37'}]
		          },
		          {
		            featureType: 'road',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#9ca5b3'}]
		          },
		          {
		            featureType: 'road.highway',
		            elementType: 'geometry',
		            stylers: [{color: '#746855'}]
		          },
		          {
		            featureType: 'road.highway',
		            elementType: 'geometry.stroke',
		            stylers: [{color: '#1f2835'}]
		          },
		          {
		            featureType: 'road.highway',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#AD9671'}]
		          },
		          {
		            featureType: 'transit',
		            elementType: 'geometry',
		            stylers: [{color: '#2f3948'}]
		          },
		          {
		            featureType: 'transit.station',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#CEC0BC'}]
		          },
		          {
		            featureType: 'water',
		            elementType: 'geometry',
		            stylers: [{color: '#39759F'}]
		          },
		          {
		            featureType: 'water',
		            elementType: 'labels.text.fill',
		            stylers: [{color: '#515c6d'}]
		          },
		          {
		            featureType: 'water',
		            elementType: 'labels.text.stroke',
		            stylers: [{color: '#17263c'}]
		          }
		        ],{
		        	name: 'Dark'
		        })

		map = new google.maps.Map(document.getElementById('map'), {
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				mapTypeIds: ['hybrid', 'retro', 'dark']
			},
			scrollwheel: false,
			rotateControl: true,
			rotateControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER,
			},
		})

		map.mapTypes.set('retro', retroStyle)
		
		map.mapTypes.set('dark', darkStyle)
		
		map.setMapTypeId('dark')

		map.setTilt(45)

		var input = document.getElementById('locationTextField')

		var autocomplete = new google.maps.places.Autocomplete(input)
		
		autocomplete.bindTo('bounds', map)

		autocomplete.addListener('place_changed', function(event) {

			place = autocomplete.getPlace()

			if (!place.geometry) {
				
				alert('Invalid format')

				callNewModal()

				return
			}

			else {
				map.setCenter(place.geometry.location)
				map.setZoom(14)
			}
		})

		//MAP CONTROL 			
			var control = document.getElementById('mapControl')
			map.controls[google.maps.ControlPosition.LEFT_TOP].push(control)

		//MAP LEGEND
			var legend = document.getElementById('legend')
			map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend)

			$('#legend').collapse('show')

		//Reset Center when on window resize

		window.addEventListener('resize', function(){

			map.setCenter(place.geometry.location)

			checkFocusWindowVisibility()
		})

		//Close InfoWindows when the zoom changes

		map.addListener('zoom_changed', function(){

			clearInfoWindows()
			clearParkingInfoWindows()
			clearPlaceInfoWindows()	
		})

		// var geocoder = new google.maps.Geocoder;

  //       document.getElementById('currentLocationButton').addEventListener('click', function() {
  //         geocodeLatLng(geocoder, map);
  //       });


	}//close initMap

//SUBMIT CITY NAME ==============================================================================================================================

	var submitLocation = function(event) {
		
		event.preventDefault()

		var fbRestaurants = []
		var fbRestaurantsAll = []
		var fbEntertainment = []
		var fbEntertainmentAll = []
		var fbRecreation = []
		var fbRecreationAll = []
		var fbShopping = []
		var fbShoppingAll = []


		$('#modalCloseButton').show()
		$('#searchLocationButton').hide()
		$('#viewMapButton').show()
		$('#loadScreen').empty()
		$('#areaCheckbox').prop('checked', false)

		$('#legendContainer').collapse('show')


		map.setMapTypeId('dark')

		if(parkingSearchCircle){

			parkingSearchCircle.setMap(null)
		}

		resetCheckboxes()

		closeFocusWindow()

		clearParkingMarkers()

		clearParkingInfoWindows()

		clearPlaceInfoWindows()

		checkFocusWindowVisibility()

		if(centerMarker !== null){
			
			hideCenterMarker()
		}

		var userinput = $('#locationTextField').val()

		$('#locationTextField').blur()

//REQUEST TO GOOGLE PLACES ======================================================================================================================

		$.get(`/search?query=${userinput}`, function(googleData, status) {

			$(document).ajaxComplete(function(event) {

				// console.log('google place search complete')
			});

			googleData = JSON.parse(googleData)

			var latitude = googleData.results[0].geometry.location.lat
			var longitude = googleData.results[0].geometry.location.lng

			    citySearchCircle = new google.maps.Circle({
			      
			      strokeColor: 'white',
			      strokeOpacity: 0.3,
			      strokeWeight: 3,
			      fillColor: 'white',
			      fillOpacity: 0.1,
			      map: map,
			      center: googleData.results[0].geometry.location,
			      radius: 3500,
			    })

			    citySearchCircle.setMap(null)

			// console.log(googleData)

//REQUESTS TO FACEBOOK ==========================================================================================================================
		
	//RESTAURANTS ===============================================================================================================================

			$.get(`/restaurants?center=${latitude},${longitude}`, function(restaurantsFacebookData, status) {

				$(document).ajaxComplete(function(event) {

			  		// console.log('facebook restaurant complete')
				})

				restaurantsFacebookData = JSON.parse(restaurantsFacebookData)

				for (var i = 0; i < restaurantsFacebookData.data.length; i++) {

					if (restaurantsFacebookData.data[i].is_permanently_closed === false) {

						fbRestaurantsAll.push(restaurantsFacebookData.data[i])
						
						fbRestaurantsAll.sort(function(a,b){

							return b.checkins - a.checkins
						})
					}
				}

				var fbRestaurantsSliced = fbRestaurantsAll.slice(0,10)

					// console.log('restaurants ', fbRestaurantsSliced)

					$('#loadScreen').append(`<li>Restaurants ... <span>LOADED</span></li>`)

						for (var i = 0; i < fbRestaurantsSliced.length; i++) {

		
							fbRestaurants.push({
								
								lat: fbRestaurantsSliced[i].location.latitude,
								lng: fbRestaurantsSliced[i].location.longitude,
								name: fbRestaurantsSliced[i].name,
								categories: fbRestaurantsSliced[i].category_list,
								about: fbRestaurantsSliced[i].about,
								website: fbRestaurantsSliced[i].website,
								facebook: fbRestaurantsSliced[i].link,
								phone: fbRestaurantsSliced[i].phone,
								hours: fbRestaurantsSliced[i].hours,
								description: fbRestaurantsSliced[i].description,
								rating: fbRestaurantsSliced[i].overall_star_rating,
								checkins: fbRestaurantsSliced[i].checkins,
								picture: fbRestaurantsSliced[i].picture,
								parking: fbRestaurantsSliced[i].parking,
							})
						}	
								// console.log(fbRestaurants)

						restaurantsMarkers = fbRestaurants.map(function(location, i) {
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								center: `{lat: ${location.lat}, lng: ${location.lng}}`,
								visible: true,
								icon: '/images/marker_orange.png',
								title: location.name,
								categories: location.categories,
								about: location.about,
								description: location.description,
								website: location.website,
								facebook: location.facebook,
								phone: location.phone,
								hours: location.hours,
								picture: location.picture,
								parking: location.parking,
							})
						})

						restaurantsMarkers.forEach(function(marker){

							marker.addListener('click', function(){

								placeInfoWindow.open(map)

								// console.log(marker)
							})
						})
			

						var restaurantStyle = [
							
								{
									url: '/images/food_icon_circle.png',
									anchorIcon: [50,50],
									anchorText: [30,43],
									textColor: 'black',
									fontFamily: 'Oswald'															
								}
							]

						restaurantsMarkerCluster = new MarkerClusterer(map, restaurantsMarkers, 
							
							{
								ignoreHidden: true, 
								gridSize: 300, 
								maxZoom: 15, 
								styles: restaurantStyle,
								averageCenter: true,
								zoomOnClick: false,

							})

						google.maps.event.addListener(restaurantsMarkerCluster, 'click', function(cluster) { 
						 
								// console.log(cluster)

								restaurantsInfoWindow = new google.maps.InfoWindow();

								clearInfoWindows()
								
								var restaurantsClickedMarkers = cluster.getMarkers()

								var content = `<div class="restaurantsClusterInfoWindowTitle">
													<p>Restaurants</p>
												</div>`

									for (var i = 0; i < cluster.markers_.length; i++) {

											content += 
												`
												<p class="clusterInfoListItem" onclick="getRestaurantInfo(this)">${cluster.markers_[i].title}</p>
											
												`										
									}
								  
								  var offset = 0.5 / Math.pow(2, map.getZoom())
								  
								  restaurantsInfoWindow.setContent(content);
								  restaurantsInfoWindow.setPosition({
								    lat: cluster.center_.lat() * (1 + offset),
								    lng: cluster.center_.lng()
								  })

								  google.maps.event.addListener(restaurantsInfoWindow, 'domready', function() {

									   var iwOuter = $('.gm-style-iw')

									   var iwBackground = iwOuter.prev()

									   iwBackground.children(':nth-child(2)').css({'display' : 'none'})

									   iwBackground.children(':nth-child(4)').css({'display' : 'none'})

								  		var iwCloseBtn = iwOuter.next()

										iwCloseBtn.css({
										  opacity: '1', // by default the close button has an opacity of 0.7
										  padding: '.4rem',
										  textAlign: 'center',
										  right: '34px', top: '4px', // button repositioning
										  border: '5px solid #F9850B', // increasing button border and new color
										  'border-radius': '13px', // circular effect
										  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
										  });
									})


									restaurantsInfoWindows.push(restaurantsInfoWindow)

								  	restaurantsInfoWindow.open(map)		  
						})
			})

	//ENTERTAINMENT =============================================================================================================================

			$.get(`/entertainment?center=${latitude},${longitude}`, function(entertainmentFacebookData, status) {

				$(document).ajaxComplete(function(event) {

			  		// console.log('facebook entertainment complete')
				})

				entertainmentFacebookData = JSON.parse(entertainmentFacebookData)

				for (var i = 0; i < entertainmentFacebookData.data.length; i++) {

					if (entertainmentFacebookData.data[i].is_permanently_closed === false){

						fbEntertainmentAll.push(entertainmentFacebookData.data[i])

						fbEntertainmentAll.sort(function(a,b){

								return b.checkins - a.checkins
						})
					}
				}

					var fbEntertainmentSliced = fbEntertainmentAll.slice(0,10)

						// console.log('entertainment ', fbEntertainmentSliced)

					var popularEntertainment = fbEntertainmentSliced[0].name
						
						$('#loadScreen').append(`<li>Entertainment Venues ... <span>LOADED</span></li>`)

						for (var i = 0; i < fbEntertainmentSliced.length; i++) {

		
							fbEntertainment.push({
								lat: fbEntertainmentSliced[i].location.latitude,
								lng: fbEntertainmentSliced[i].location.longitude,
								name: fbEntertainmentSliced[i].name,
								categories: fbEntertainmentSliced[i].category_list,
								about: fbEntertainmentSliced[i].about,
								website: fbEntertainmentSliced[i].website,
								facebook: fbEntertainmentSliced[i].link,
								phone: fbEntertainmentSliced[i].phone,
								hours: fbEntertainmentSliced[i].hours,
								description: fbEntertainmentSliced[i].description,
								rating: fbEntertainmentSliced[i].overall_star_rating,
								picture: fbEntertainmentSliced[i].picture,
								parking: fbEntertainmentSliced[i].parking,
							})
						}
					
						entertainmentMarkers = fbEntertainment.map(function(location, i) {
													
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								center: `{lat: ${location.lat}, lng: ${location.lng}}`,
								visible: true,
								icon: '/images/marker_purple.png',
								title: location.name,
								categories: location.categories,
								about: location.about,
								description: location.description,
								website: location.website,
								facebook: location.facebook,
								phone: location.phone,
								hours: location.hours,
								picture: location.picture,
								parking: location.parking,
							})	
						})

						entertainmentMarkers.forEach(function(marker){

							marker.addListener('click', function(){

								placeInfoWindow.open(map)

								// console.log(marker)
							})
						})

						var entertainmentStyle = [
							
							{
								url: '/images/entertainment_icon_circle.png',
								anchorIcon: [50,50],
								anchorText: [27,47],
								textColor: 'black',
								fontFamily: 'Oswald'													
							}
						]

						entertainmentMarkerCluster = new MarkerClusterer(map, entertainmentMarkers, 
							
							{
								ignoreHidden: true, 
								gridSize: 300, 
								maxZoom: 15, 
								styles: entertainmentStyle,
								averageCenter: true,
								zoomOnClick: false,	
							})

						google.maps.event.addListener(entertainmentMarkerCluster, 'click', function(cluster) { 
							
								var entertainmentInfoWindow = new google.maps.InfoWindow()

								clearInfoWindows()
								
								var entertainmentClickedMarkers = cluster.getMarkers()

								var content = `<div class="entertainmentClusterInfoWindowTitle">
													<p>Entertainment Venues</p>
												</div>
												`

									for (var i = 0; i < cluster.markers_.length; i++) {

											content += 
												`
												<p class="clusterInfoListItem" onclick="getEntertainmentInfo(this)">${cluster.markers_[i].title}</p>
												`	
									}
								  
								  var offset = 0.5 / Math.pow(2, map.getZoom())
								  
								  entertainmentInfoWindow.setContent(content);
								  entertainmentInfoWindow.setPosition({
								    lat: cluster.center_.lat() * (1 + offset),
								    lng: cluster.center_.lng()
								  })

								   google.maps.event.addListener(entertainmentInfoWindow, 'domready', function() {

								   	var iwOuter = $('.gm-style-iw')

								   	var iwBackground = iwOuter.prev()

								   	iwBackground.children(':nth-child(2)').css({'display' : 'none'})

								   	iwBackground.children(':nth-child(4)').css({'display' : 'none'})

							  		var iwCloseBtn = iwOuter.next()
									
									iwCloseBtn.css({
									  opacity: '1', // by default the close button has an opacity of 0.7
									  padding: '.4rem',
									  textAlign: 'center',
									  right: '34px', top: '4px', // button repositioning
									  border: '5px solid #5A4BC6', // increasing button border and new color
									  'border-radius': '13px', // circular effect
									  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
									  });
									})

									entertainmentInfoWindows.push(entertainmentInfoWindow)

								  	entertainmentInfoWindow.open(map)

							})
			})

	//RECREATION ================================================================================================================================

			$.get(`/recreation?center=${latitude},${longitude}`, function(recreationFacebookData, status) {

				$(document).ajaxComplete(function(event) {

			  		// console.log('facebook recreation complete')
				})

				recreationFacebookData = JSON.parse(recreationFacebookData)

				for (var i = 0; i < recreationFacebookData.data.length; i++) {
		
					if (recreationFacebookData.data[i].is_permanently_closed === false) {

						fbRecreationAll.push(recreationFacebookData.data[i])

						fbRecreationAll.sort(function(a,b){

							return b.checkins - a.checkins
						})
					}
				}

				var fbRecreationSliced = fbRecreationAll.slice(0,10)

					// console.log('recreation ', fbRecreationSliced)

				var popularRecreation = fbRecreationSliced[0].name
					
					$('#loadScreen').append(`<li>Recreational Facilities ... <span>LOADED</span></li>`)

						for (var i = 0; i < fbRecreationSliced.length; i++) {

		
							fbRecreation.push({
								
								lat: fbRecreationSliced[i].location.latitude,
								lng: fbRecreationSliced[i].location.longitude,
								name: fbRecreationSliced[i].name,
								categories: fbRecreationSliced[i].category_list,
								about: fbRecreationSliced[i].about,
								website: fbRecreationSliced[i].website,
								facebook: fbRecreationSliced[i].link,
								phone: fbRecreationSliced[i].phone,
								hours: fbRecreationSliced[i].hours,
								description: fbRecreationSliced[i].description,
								rating: fbRecreationSliced[i].overall_star_rating,
								picture: fbRecreationSliced[i].picture,
								parking: fbRecreationSliced[i].parking,
							})
						}

						recreationMarkers = fbRecreation.map(function(location, i) {
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								center: `{lat: ${location.lat}, lng: ${location.lng}}`,
								visible: true,
								icon: '/images/marker_red.png',
								title: location.name,
								categories: location.categories,
								about: location.about,
								description: location.description,
								website: location.website,
								facebook: location.facebook,
								phone: location.phone,
								hours: location.hours,
								picture: location.picture,
								parking: location.parking,
							})
						})

						recreationMarkers.forEach(function(marker){

							marker.addListener('click', function(){

								placeInfoWindow.open(map)

								// console.log(marker)
							})
						})

						var recreationStyle = [
							
							{
								url: '/images/fitness_icon_circle.png',
								anchorIcon: [50,50],
								anchorText: [35,46],
								textColor: 'black',
								fontFamily: 'Oswald'								
							}
						]

						recreationMarkerCluster = new MarkerClusterer(map, recreationMarkers, 
							
							{
								ignoreHidden: true, 
								gridSize: 300, 
								maxZoom: 15, 
								styles: recreationStyle,
								averageCenter: true,
								zoomOnClick: false,						
							})	

						google.maps.event.addListener(recreationMarkerCluster, 'click', function(cluster) { 

							var recreationInfoWindow = new google.maps.InfoWindow()

							clearInfoWindows()
							
							var recreationClickedMarkers = cluster.getMarkers()

							var content = `<div class="recreationClusterInfoWindowTitle">
												<p>Recreational Facilities</p>
											</div>`

								for (var i = 0; i < cluster.markers_.length; i++) {

										content += 
											`
											<p class="clusterInfoListItem" onclick="getRecreationInfo(this)">${cluster.markers_[i].title}</p>
											`	
								}
							  
							  var offset = 0.5 / Math.pow(2, map.getZoom())
							  
							  recreationInfoWindow.setContent(content);
							  recreationInfoWindow.setPosition({
							    lat: cluster.center_.lat() * (1 + offset),
							    lng: cluster.center_.lng()
							  
							  })

							  google.maps.event.addListener(recreationInfoWindow, 'domready', function() {

								   var iwOuter = $('.gm-style-iw')

								   var iwCloseBtn = iwOuter.next()

									iwCloseBtn.css({
									  opacity: '1', // by default the close button has an opacity of 0.7
									  padding: '.4rem',
									  textAlign: 'center',
									  right: '34px', top: '4px', // button repositioning
									  border: '5px solid #E3090E', // increasing button border and new color
									  'border-radius': '13px', // circular effect
									  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
									  });

								   var iwBackground = iwOuter.prev()

								   iwBackground.children(':nth-child(2)').css({'display' : 'none'})

								   iwBackground.children(':nth-child(4)').css({'display' : 'none'})

								})

								recreationInfoWindows.push(recreationInfoWindow)

							  	recreationInfoWindow.open(map)
						})
			})

	//SHOPPING ==================================================================================================================================

			$.get(`/shopping?center=${latitude},${longitude}`, function(shoppingFacebookData, status) {

				$(document).ajaxComplete(function(event) {

			  		// console.log('facebook shopping complete')
				})

				shoppingFacebookData = JSON.parse(shoppingFacebookData)

				for (var i = 0; i < shoppingFacebookData.data.length; i++) {

					if (shoppingFacebookData.data[i].is_permanently_closed === false) {

						fbShoppingAll.push(shoppingFacebookData.data[i])

						fbShoppingAll.sort(function(a,b){

							return b.checkins - a.checkins
						})
					}
				}

				var fbShoppingSliced = fbShoppingAll.slice(0,10)

					// console.log('shopping ', fbShoppingSliced)

				var popularShopping = fbShoppingSliced[0].name
					
					$('#loadScreen').append(`<li>Shopping Centers ... <span>LOADED</span></li>`)

					for (var i = 0; i < fbShoppingSliced.length; i++) {
	
						fbShopping.push({
							lat: fbShoppingSliced[i].location.latitude,
							lng: fbShoppingSliced[i].location.longitude,
							name: fbShoppingSliced[i].name,
							categories: fbShoppingSliced[i].category_list,
							about: fbShoppingSliced[i].about,
							website: fbShoppingSliced[i].website,
							facebook: fbShoppingSliced[i].link,
							phone: fbShoppingSliced[i].phone,
							hours: fbShoppingSliced[i].hours,
							description: fbShoppingSliced[i].description,
							rating: fbShoppingSliced[i].overall_star_rating,
							picture: fbShoppingSliced[i].picture,
							parking: fbShoppingSliced[i].parking,
						})
					}

						shoppingMarkers = fbShopping.map(function(location, i) {
							
							return new google.maps.Marker({
								position: new google.maps.LatLng(location.lat, location.lng),
								center: `{lat: ${location.lat}, lng: ${location.lng}}`,
								visible: true,
								icon: '/images/marker_green.png',
								title: location.name,
								categories: location.categories,
								about: location.about,
								description: location.description,
								website: location.website,
								facebook: location.facebook,
								phone: location.phone,
								hours: location.hours,
								picture: location.picture,
								parking: location.parking,
							})	
						})

						shoppingMarkers.forEach(function(marker){

							marker.addListener('click', function(){

								placeInfoWindow.open(map)

								// console.log(marker)
							})
						})

						var shoppingStyle = [
							
							{
								url: '/images/shopping_icon_circle.png',
								anchorIcon: [50,50],
								anchorText: [30,48],
								textColor: 'black',
								fontFamily: 'Oswald',														
							}
						]

						shoppingMarkerCluster = new MarkerClusterer(map, shoppingMarkers, 
							
							{
								ignoreHidden: true, 
								gridSize: 300, 
								maxZoom: 15, 
								styles: shoppingStyle,
								averageCenter: true,
								zoomOnClick: false,
							})

						google.maps.event.addListener(shoppingMarkerCluster, 'click', function(cluster) { 

								var shoppingInfoWindow = new google.maps.InfoWindow()

								clearInfoWindows()
								
								var shoppingClickedMarkers = cluster.getMarkers()

								var content = `<div class="shoppingClusterInfoWindowTitle">
													<p>Shopping Centers</p>
												</div>`

									for (var i = 0; i < cluster.markers_.length; i++) {

											content += 
												`
												<p class="clusterInfoListItem" onclick="getShoppingInfo(this)">${cluster.markers_[i].title}</p>
												`	
									}
								  
								  var offset = 0.5 / Math.pow(2, map.getZoom())
								  
								  shoppingInfoWindow.setContent(content);
								  shoppingInfoWindow.setPosition({
								    lat: cluster.center_.lat() * (1 + offset),
								    lng: cluster.center_.lng()
								  
								  })

								  google.maps.event.addListener(shoppingInfoWindow, 'domready', function() {

									   var iwOuter = $('.gm-style-iw')

									   var iwCloseBtn = iwOuter.next()

										iwCloseBtn.css({
										  opacity: '1', // by default the close button has an opacity of 0.7
										  padding: '.4rem',
										  textAlign: 'center',
										  right: '34px', top: '4px', // button repositioning
										  border: '5px solid #107208', // increasing button border and new color
										  'border-radius': '13px', // circular effect
										  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
										  });

									   var iwBackground = iwOuter.prev()

									   iwBackground.children(':nth-child(2)').css({'display' : 'none'})

									   iwBackground.children(':nth-child(4)').css({'display' : 'none'})

									})

									shoppingInfoWindows.push(shoppingInfoWindow)

								  	shoppingInfoWindow.open(map)
							})
			})
					
		}) //google request close					

	} //submit close

//CLICK EVENTS ==================================================================================================================================

//NEW SEARCH 

	$('#newSearchButton').on('click', function(){

		callNewModal()
		$('#viewMapButton').hide()
		$('#searchLocationButton').show()
	})

//RESET ZOOM

	$('#resetZoomButton').on('click', function(){

		resetZoom()
	})

//TOGGLE LEGEND

	$('#hideButton').on('click', function(){

		toggleLegend()

		if($(this).text() === 'hide'){

			$(this).text('show') 
		}
		else{

			$(this).text('hide')
		}
	})

//TOGGLE FOCUS WINDOW HOURS

	$('#focusWindowHoursTitle').on('click', function(){

		$('#focusWindowHoursList').collapse('toggle')
	})

//TOGGLE FOCUS WINDOW DESCRIPTION

	$('#focusWindowDescriptionTitle').on('click', function(){

		$('#focusWindowDescription').collapse('toggle')
	})

//TOGGLE SHOW/HIDE CLUSTERS ====================================================================================================================
	
	var toggleRestaurants = function(){

		
		if ($('#foodCheckbox').is(':checked')){

			for (var i in restaurantsMarkers) {
			    
			    restaurantsMarkers[i].setVisible(true)
			}

			$('#resultsRestaurantsList').toggle('show')
		}

		else {

			for (var i in restaurantsMarkers) {
			    
			    restaurantsMarkers[i].setVisible(false)
			}

			$('#resultsRestaurantsList').toggle('hide')

				clearInfoWindows()
		}
				repaintAllClusters()
	}

	var toggleEntertainment = function(){

		
		if ($('#artsCheckbox').is(':checked')){

			for (var i in entertainmentMarkers) {
			    
			    entertainmentMarkers[i].setVisible(true);
			}

			$('#resultsEntertainmentList').toggle('show')

		}
		else {

			for (var i in entertainmentMarkers) {
			    
			    entertainmentMarkers[i].setVisible(false);
			}

			$('#resultsEntertainmentList').toggle('hide')

				clearInfoWindows()
		}
				repaintAllClusters()
	}

	var toggleRecreation = function(){

		
		if ($('#fitnessCheckbox').is(':checked')){

			for (var i in recreationMarkers) {
			    
			    recreationMarkers[i].setVisible(true);
			}

			$('#resultsRecreationList').toggle('show')


		}
		else {

			for (var i in recreationMarkers) {
			    
			    recreationMarkers[i].setVisible(false);
			}

			$('#resultsRecreationList').toggle('hide')

				clearInfoWindows()
		}
				repaintAllClusters()
	}

	var toggleShopping = function(){

		
		if ($('#shoppingCheckbox').is(':checked')){

			for (var i in shoppingMarkers) {
			    
			    shoppingMarkers[i].setVisible(true);
			}

			$('#resultsShoppingList').toggle('show')


		}
		else {

			for (var i in shoppingMarkers) {
			    
			    shoppingMarkers[i].setVisible(false);
			}

			$('#resultsShoppingList').toggle('hide')

				clearInfoWindows()
		}
				repaintAllClusters()
	}

	var toggleShowSearchArea = function(){

		if(citySearchCircle.getMap() === null) {

			citySearchCircle.setMap(map)
		}

		else{

			citySearchCircle.setMap(null)
		}
	}


//GET PLACE INFO ================================================================================================================================

	var getRestaurantInfo = function(place){

		clearFocusWindow()

		openFocusWindow()

		$('#focusWindowHoursList').collapse('show')

		$('#focusWindowDescription').collapse('show')

		insideText = place.textContent

		for(var i = 0; i < restaurantsMarkers.length; i++){


			if(restaurantsMarkers[i].title === insideText){
 
				placeMarkerLocation = restaurantsMarkers[i].center

				placeMarkerInfo = restaurantsMarkers[i]

				placeMarkerParking = restaurantsMarkers[i].parking

				// console.log(placeMarkerParking)

				$('#focusWindowPhoto').attr('src', restaurantsMarkers[i].picture.data.url)
				$('#focusWindowName').text(restaurantsMarkers[i].title)
				$('#focusWindowWebsite').attr('href', restaurantsMarkers[i].website)
				$('#focusWindowFacebook').attr('href', restaurantsMarkers[i].facebook)
				$('#focusWindowPhone').text(restaurantsMarkers[i].phone)

			//Categories

				if(restaurantsMarkers[i].categories){

					for(var j = 0; j < 1; j++){

						$('#focusWindowCategories').text(`${restaurantsMarkers[i].categories[j].name}`)
					}
				}
					
			//Hours
				if(restaurantsMarkers[i].hours) {
					
					if(restaurantsMarkers[i].hours.mon_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Monday ${restaurantsMarkers[i].hours.mon_1_open} - ${restaurantsMarkers[i].hours.mon_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Monday CLOSED</li>`)
					}			
					
					if(restaurantsMarkers[i].hours.tue_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Tuesday ${restaurantsMarkers[i].hours.tue_1_open} - ${restaurantsMarkers[i].hours.tue_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Tuesday CLOSED</li>`)
					}			

					if(restaurantsMarkers[i].hours.wed_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Wednesday ${restaurantsMarkers[i].hours.wed_1_open} - ${restaurantsMarkers[i].hours.wed_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Wednesday CLOSED</li>`)
					}

					if(restaurantsMarkers[i].hours.thu_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Thursday ${restaurantsMarkers[i].hours.thu_1_open} - ${restaurantsMarkers[i].hours.thu_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Thursday CLOSED</li>`)
					}

					if(restaurantsMarkers[i].hours.fri_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Friday ${restaurantsMarkers[i].hours.fri_1_open} - ${restaurantsMarkers[i].hours.fri_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Friday CLOSED</li>`)
					}

					if(restaurantsMarkers[i].hours.sat_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Saturday ${restaurantsMarkers[i].hours.sat_1_open} - ${restaurantsMarkers[i].hours.sat_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Saturday CLOSED</li>`)
					}
					
					if(restaurantsMarkers[i].hours.sun_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Sunday ${restaurantsMarkers[i].hours.sun_1_open} - ${restaurantsMarkers[i].hours.sun_1_close}</li>`)
							
					}
					else {

						$('#focusWindowHoursList').append(`<li>Sunday CLOSED</li>`)
					}
				}
				else {

					$('#focusWindowHoursList').text('N/A')
					
					// console.log('no hours info')
				}

			//Description

				if (restaurantsMarkers[i].about !== undefined){

					$('#focusWindowDescription').text(restaurantsMarkers[i].about)
				}
				else {

					$('#focusWindowDescription').text(restaurantsMarkers[i].description)
				}

			//Show on Map Button

				$('#showOnMapButton').append(`<img src="/images/show_on_map_button.png" onclick="showLocationOnMap(${placeMarkerLocation})">`)

			}
		}
	}

	var getEntertainmentInfo = function(place){

		clearFocusWindow()

		openFocusWindow()

		$('#focusWindowHoursList').collapse('show')

		$('#focusWindowDescription').collapse('show')

		insideText = place.textContent

		for(var i = 0; i < entertainmentMarkers.length; i++){

			if(entertainmentMarkers[i].title === insideText){

				placeMarkerLocation = entertainmentMarkers[i].center

				placeMarkerInfo = entertainmentMarkers[i] 

				placeMarkerParking = entertainmentMarkers[i].parking

				// console.log(placeMarkerParking)

				$('#focusWindowPhoto').attr('src', entertainmentMarkers[i].picture.data.url)
				$('#focusWindowName').text(entertainmentMarkers[i].title)
				$('#focusWindowWebsite').attr('href', entertainmentMarkers[i].website)
				$('#focusWindowFacebook').attr('href', entertainmentMarkers[i].facebook)
				$('#focusWindowPhone').text(entertainmentMarkers[i].phone)

			//Categories

				if(entertainmentMarkers[i].categories){

					for(var j = 0; j < 1; j++){

						$('#focusWindowCategories').text(`${entertainmentMarkers[i].categories[j].name}`)
					}
				}	
					
			//Hours

				if(entertainmentMarkers[i].hours){	

					if(entertainmentMarkers[i].hours.mon_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Monday ${entertainmentMarkers[i].hours.mon_1_open} - ${entertainmentMarkers[i].hours.mon_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Monday CLOSED</li>`)
					}			
					
					if(entertainmentMarkers[i].hours.tue_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Tuesday ${entertainmentMarkers[i].hours.tue_1_open} - ${entertainmentMarkers[i].hours.tue_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Tuesday CLOSED</li>`)
					}			

					if(entertainmentMarkers[i].hours.wed_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Wednesday ${entertainmentMarkers[i].hours.wed_1_open} - ${entertainmentMarkers[i].hours.wed_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Wednesday CLOSED</li>`)
					}

					if(entertainmentMarkers[i].hours.thu_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Thursday ${entertainmentMarkers[i].hours.thu_1_open} - ${entertainmentMarkers[i].hours.thu_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Thursday CLOSED</li>`)
					}

					if(entertainmentMarkers[i].hours.fri_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Friday ${entertainmentMarkers[i].hours.fri_1_open} - ${entertainmentMarkers[i].hours.fri_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Friday CLOSED</li>`)
					}

					if(entertainmentMarkers[i].hours.sat_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Saturday ${entertainmentMarkers[i].hours.sat_1_open} - ${entertainmentMarkers[i].hours.sat_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Saturday CLOSED</li>`)
					}
					
					if(entertainmentMarkers[i].hours.sun_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Sunday ${entertainmentMarkers[i].hours.sun_1_open} - ${entertainmentMarkers[i].hours.sun_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Sunday CLOSED</li>`)
					}
				}
				else {

					$('#focusWindowHoursList').text('N/A')
					
					// console.log('no hours info')
				}	

				//Description	
				if (entertainmentMarkers[i].about !== undefined){
						
					$('#focusWindowDescription').text(entertainmentMarkers[i].about)
				}
				else {

					$('#focusWindowDescription').text(entertainmentMarkers[i].description)
				}

				//Show on Map Button

					$('#showOnMapButton').append(`<img src="/images/show_on_map_button.png" onclick="showLocationOnMap(${placeMarkerLocation})">`)

				
			}
		}
	}

	var getRecreationInfo = function(place){

		clearFocusWindow()

		openFocusWindow()

		$('#focusWindowHoursList').collapse('show')

		$('#focusWindowDescription').collapse('show')

		insideText = place.textContent

		for(var i = 0; i < recreationMarkers.length; i++){

			if(recreationMarkers[i].title === insideText){

				placeMarkerLocation = recreationMarkers[i].center

				placeMarkerInfo = recreationMarkers[i]

				placeMarkerParking = recreationMarkers[i].parking

				// console.log(placeMarkerParking)

				$('#focusWindowPhoto').attr('src', recreationMarkers[i].picture.data.url)
				$('#focusWindowName').text(recreationMarkers[i].title)
				$('#focusWindowWebsite').attr('href', recreationMarkers[i].website)
				$('#focusWindowFacebook').attr('href', recreationMarkers[i].facebook)
				$('#focusWindowPhone').text(recreationMarkers[i].phone)

			//Categories

				if(recreationMarkers[i].categories){

					for(var j = 0; j < 1; j++){

						$('#focusWindowCategories').text(`${recreationMarkers[i].categories[j].name}`)
					}
				}	

			//Hours
					
				if(recreationMarkers[i].hours) {
					
					if(recreationMarkers[i].hours.mon_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Monday ${recreationMarkers[i].hours.mon_1_open} - ${recreationMarkers[i].hours.mon_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Monday CLOSED</li>`)
					}			
					
					if(recreationMarkers[i].hours.tue_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Tuesday ${recreationMarkers[i].hours.tue_1_open} - ${recreationMarkers[i].hours.tue_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Tuesday CLOSED</li>`)
					}			

					if(recreationMarkers[i].hours.wed_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Wednesday ${recreationMarkers[i].hours.wed_1_open} - ${recreationMarkers[i].hours.wed_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Wednesday CLOSED</li>`)
					}

					if(recreationMarkers[i].hours.thu_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Thursday ${recreationMarkers[i].hours.thu_1_open} - ${recreationMarkers[i].hours.thu_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Thursday CLOSED</li>`)
					}

					if(recreationMarkers[i].hours.fri_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Friday ${recreationMarkers[i].hours.fri_1_open} - ${recreationMarkers[i].hours.fri_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Friday CLOSED</li>`)
					}

					if(recreationMarkers[i].hours.sat_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Saturday ${recreationMarkers[i].hours.sat_1_open} - ${recreationMarkers[i].hours.sat_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Saturday CLOSED</li>`)
					}
					
					if(recreationMarkers[i].hours.sun_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Sunday ${recreationMarkers[i].hours.sun_1_open} - ${recreationMarkers[i].hours.sun_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Sunday CLOSED</li>`)
					}

				}
				else {

					$('#focusWindowHoursList').text('N/A')
					
					// console.log('no hours info')
				}

			//Description	
				if (recreationMarkers[i].about !== undefined){
					
					$('#focusWindowDescription').text(recreationMarkers[i].about)
				}
				else {

					$('#focusWindowDescription').text(recreationMarkers[i].description)
				}

			//Show on Map Button

					$('#showOnMapButton').append(`<img src="/images/show_on_map_button.png" onclick="showLocationOnMap(${placeMarkerLocation})">`)

			}
		}
	}

	var getShoppingInfo = function(place){

		clearFocusWindow()

		openFocusWindow()

		$('#focusWindowHoursList').collapse('show')

		$('#focusWindowDescription').collapse('show')

		insideText = place.textContent

		for(var i = 0; i < shoppingMarkers.length; i++){

			if(shoppingMarkers[i].title === insideText){

				placeMarkerLocation = shoppingMarkers[i].center

				placeMarkerInfo = shoppingMarkers[i]

				placeMarkerParking = shoppingMarkers[i].parking

				// console.log(placeMarkerParking)

				$('#focusWindowPhoto').attr('src', shoppingMarkers[i].picture.data.url)
				$('#focusWindowName').text(shoppingMarkers[i].title)
				$('#focusWindowWebsite').attr('href', shoppingMarkers[i].website)
				$('#focusWindowFacebook').attr('href', shoppingMarkers[i].facebook)
				$('#focusWindowPhone').text(shoppingMarkers[i].phone)

			//Categories

			if(shoppingMarkers[i].categories){

				for(var j = 0; j < 1; j++){

					$('#focusWindowCategories').text(`${shoppingMarkers[i].categories[j].name}`)
				}
			}	
				
			//Hours

				if(shoppingMarkers[i].hours) {

					if(shoppingMarkers[i].hours.mon_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Monday ${shoppingMarkers[i].hours.mon_1_open} - ${shoppingMarkers[i].hours.mon_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Monday CLOSED</li>`)
					}			
					
					if(shoppingMarkers[i].hours.tue_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Tuesday ${shoppingMarkers[i].hours.tue_1_open} - ${shoppingMarkers[i].hours.tue_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Tuesday CLOSED</li>`)
					}			

					if(shoppingMarkers[i].hours.wed_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Wednesday ${shoppingMarkers[i].hours.wed_1_open} - ${shoppingMarkers[i].hours.wed_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Wednesday CLOSED</li>`)
					}

					if(shoppingMarkers[i].hours.thu_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Thursday ${shoppingMarkers[i].hours.thu_1_open} - ${shoppingMarkers[i].hours.thu_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Thursday CLOSED</li>`)
					}

					if(shoppingMarkers[i].hours.fri_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Friday ${shoppingMarkers[i].hours.fri_1_open} - ${shoppingMarkers[i].hours.fri_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Friday CLOSED</li>`)
					}

					if(shoppingMarkers[i].hours.sat_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Saturday ${shoppingMarkers[i].hours.sat_1_open} - ${shoppingMarkers[i].hours.sat_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Saturday CLOSED</li>`)
					}
					
					if(shoppingMarkers[i].hours.sun_1_open !== undefined){
						
						$('#focusWindowHoursList').append(`<li>Sunday ${shoppingMarkers[i].hours.sun_1_open} - ${shoppingMarkers[i].hours.sun_1_close}</li>`)
					}
					else {

						$('#focusWindowHoursList').append(`<li>Sunday CLOSED</li>`)
					}
				}
				else {

					$('#focusWindowHoursList').text('N/A')
					
					// console.log('no hours info')
				}

			//Description
				if (shoppingMarkers[i].about !== undefined){
					
					$('#focusWindowDescription').text(shoppingMarkers[i].about)
				}
				else {
					
					$('#focusWindowDescription').text(shoppingMarkers[i].description)
				}
				
			//Show on Map Button

					$('#showOnMapButton').append(`<img src="/images/show_on_map_button.png" onclick="showLocationOnMap(${placeMarkerLocation})">`)

			}
		}
	}

//FOCUS WINDOW ==================================================================================================================================

	function openFocusWindow() {

		checkFocusWindowVisibility()
	    
	    if(document.getElementById('focusWindow').style.visibility !== "visible"){

		    map.panBy(100,0)
	    }

	    document.getElementById("focusWindow").style.visibility = "visible"
	    document.getElementById("main").style.width = "75vw"
	    document.getElementById("main").style.marginRight = "0"

    	google.maps.event.trigger(map, 'resize');

	}

	function closeFocusWindow() {

		checkFocusWindowVisibility()

    	document.getElementById('focusWindow').style.visibility = "hidden"
    	document.getElementById('main').style.width = "95vw"
    	document.getElementById('main').style.margin = 'auto'

    	google.maps.event.trigger(map, 'resize');
    	// document.getElementById("main").style.marginRight = ""
	}

//PLACE INFO AND MARKERS ========================================================================================================================

	var showLocationOnMap = function(coordinates){

		// console.log(placeMarkerParking)

		clearPlaceInfoWindows()

		if(centerMarker !== null){
			
			hideCenterMarker()
			showMarkers()
			clearParkingMarkers()
		}

		map.setCenter(coordinates)
		map.setZoom(19)
		map.setMapTypeId('hybrid')

		// console.log(placeMarkerInfo)

		parkingSearchLat = coordinates.lat
		parkingSearchLng = coordinates.lng

		placeInfoWindow = new google.maps.InfoWindow({
			maxWidth: 500,
			pixelOffset: new google.maps.Size(0,-30),

		})

		//GET REQUEST TO GOOGLE FOR PLACE DETAILS

		$.get(`/place?query=${placeMarkerInfo.title}&location=${parkingSearchLat},${parkingSearchLng}`, function(googlePlaceSearchData, status){

			$(document).ajaxComplete(function(event) {
				
				console.log('google place complete')
			})

			googlePlaceSearchData = JSON.parse(googlePlaceSearchData)

			// console.log('place search', googlePlaceSearchData)

			locationAddress = googlePlaceSearchData.results[0].formatted_address

			var request = {
				placeId: googlePlaceSearchData.results[0].place_id
			}

			service = new google.maps.places.PlacesService(map);
			
			service.getDetails(request, callback)

			function callback(locationDetails, status) {
			  
		  		if (status === google.maps.places.PlacesServiceStatus.OK) {
		    
		    		// console.log('locationDetails', locationDetails)
		    		
		    		if (locationDetails.photos){

			    		var random = Math.floor(Math.random() * locationDetails.photos.length)

			    		var locationPhoto = locationDetails.photos[random].getUrl({'maxWidth': 250, 'maxHeight': 175})
			    	}

			    	var currentState
			    	var currentStateImg
			    
			    //HOURS DISPLAY

			    	if(locationDetails.opening_hours){

			    		currentState = locationDetails.opening_hours.open_now

			    		if(currentState === true){

			    			currentStateImg = '/images/open_icon.png'
			    		}

			    		else{

			    			currentStateImg = '/images/Close-icon.png'
			    		}

			    		// console.log('currentState? ', currentState)
			    	}
			    	else{
			    		
			    		// console.log('no hours info')
			    	}

			    //PARKING DISPLAY

			    if(placeMarkerParking !== undefined){			   

			    	if(placeMarkerParking.lot === 1 ){

			    		var parkingLot = "Yes"
			    	}
			    	else{

			    		parkingLot = "No"
			    	}

			    	if(placeMarkerParking.street === 1){

			    		var parkingStreet = "Yes"
			    	}
			    	else{

			    		parkingStreet = "No"
			    	}

			    	if(placeMarkerParking.valet === 1){

			    		var parkingValet = "Yes"
			    	}
			    	else{

			    		parkingValet = "No"
			    	}

			    }

			   	else{

			   		parkingLot = 'No'
			   		parkingStreet = 'No'
			   		parkingValet = 'No'

			   	}
					var locationMarkerContent = 
						`
							<div class="placeInfoWindowStyle">
								<div class="placeInfoWindowTitleContainer">
									<h3 class="placeInfoWindowTitle">${placeMarkerInfo.title}</h3>
								</div>
								<div id="placeAddress">
									<p>${locationAddress}</p>
									<img id="currentStateImg" src="${currentStateImg}" alt="" />
								</div>
								<div id="placeInfoWindowRightContainer">
									<img src="${locationPhoto}" alt="" />
								</div>
								<br> 
								<div id="placeParkingButton">
								<h5>Parking Info</h5>
								<ul id="placeParkingInfoList">
									<li>Lot: ${parkingLot}</li>
									<li>Street: ${parkingStreet}</li>
									<li>Valet: ${parkingValet}</li>
								</ul>
									<button onclick="getParkingData()">Additional Parking</button>
								</div>
							</div>
						`

					google.maps.event.addListener(placeInfoWindow, 'domready', function() {

	   					var iwOuter = $('.gm-style-iw')

					   	var iwBackground = iwOuter.prev()

					   	iwBackground.children(':nth-child(2)').css({'display' : 'none'})

					   	iwBackground.children(':nth-child(4)').css({'display' : 'none'})

					   	iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1', 'background-color' : '#2A2A2A', 'border' : '1px solid grey'});


				  		var iwCloseBtn = iwOuter.next()

						iwCloseBtn.css({
						  opacity: '1', // by default the close button has an opacity of 0.7
						  padding: '.4rem',
						  textAlign: 'center',
						  right: '34px', top: '4px', // button repositioning
						  border: '5px solid #282828', // increasing button border and new color
						  'border-radius': '13px', // circular effect
						  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
						  });

					   var iwBackground = iwOuter.prev()

					   iwBackground.children(':nth-child(2)').css({'display' : 'none'})

					   iwBackground.children(':nth-child(4)').css({'display' : 'none'})
					})

					placeInfoWindow.setContent(locationMarkerContent)
					placeInfoWindow.setPosition({
					    lat: coordinates.lat,
					    lng: coordinates.lng
					})
		
					placeInfoWindows.push(placeInfoWindow)

					placeInfoWindow.open(map)
		  		}
			}
		})
	}

//PARKING INFO ==================================================================================================================================

	var getParkingData = function(){

		//GET REQUEST TO GOOGLE PLACE SEARCH FOR PARKING

		var parkingDistance = null
		var parkingDuration = null


		$.get(`/parking?location=${parkingSearchLat},${parkingSearchLng}`, function(googleParkingData, status){

			$(document).ajaxComplete(function(event, xhr, settings) {
				
				// console.log('google parking complete')
			})
				
				googleParkingData = JSON.parse(googleParkingData)

				var filteredParkingData = []
				var slicedFilteredParkingData = []

				for(var i = 0; i < googleParkingData.results.length; i++){

					if(googleParkingData.results[i].types[0] === "parking") {

						filteredParkingData.push(googleParkingData.results[i])
					}

					if(filteredParkingData.length >= 5){

						slicedFilteredParkingData = filteredParkingData.slice(0,5)
					}

					else{

						slicedFilteredParkingData = filteredParkingData
					}
				}

				if (slicedFilteredParkingData.length > 0) {
				
					hideMarkers()

					clearParkingMarkers()

					placeInfoWindow.close()

					parkingMarkers = slicedFilteredParkingData.map(function(location, i) {
						
						return new google.maps.Marker({
							map: map,
							position: new google.maps.LatLng(location.geometry.location),
							icon: '/images/parking_icon.png',
							title: location.name,
							id: location.place_id,
							visible: true,
						})
					})

					centerMarker = new google.maps.Marker({

							map: map,
							position: new google.maps.LatLng({
							lat: parkingSearchLat,
							lng: parkingSearchLng
							}),
							icon: '/images/target_icon.png',
							visible: true
					})

					centerMarkers.push(centerMarker)

					centerMarker.addListener('click', function(){

						placeInfoWindow.open(map)
					})

					parkingMarkers.forEach(function(marker){

						marker.addListener('click', function(){

							$.get(`/distance?origins=${parkingSearchLat},${parkingSearchLng}&destinations=${marker.id}`, function(googleParkingDistanceData, status){

								googleParkingDistanceData = JSON.parse(googleParkingDistanceData)

								parkingDistance = googleParkingDistanceData.rows[0].elements[0].distance.text
								parkingDuration = googleParkingDistanceData.rows[0].elements[0].duration.text

								// console.log(googleParkingDistanceData)

								clearParkingInfoWindows()

								parkingInfoWindow = new google.maps.InfoWindow({
									maxWidth: 300,
									pixelOffset: new google.maps.Size(0,-35),
								})

								var parkingInfoWindowContent = `
										
										<div class="placeInfoWindowStyle">
											<div id="parkingInfoWindow">
												<h3>${marker.title}</h3>
												<ul class="parkingInfoWindowList">
													<li>Distance: ${parkingDistance}</li>
													<li>Walking Time: ${parkingDuration}</li>
												</ul>
											</div>
										</div>	
									`	

								google.maps.event.addListener(parkingInfoWindow, 'domready', function() {

			   					var iwOuter = $('.gm-style-iw')

							   	var iwBackground = iwOuter.prev()

							   	iwBackground.children(':nth-child(2)').css({'display' : 'none'})

							   	iwBackground.children(':nth-child(4)').css({'display' : 'none'})

							   	iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1', 'background-color' : '#2A2A2A', 'border' : '1px solid grey'});


						  		var iwCloseBtn = iwOuter.next()

								iwCloseBtn.css({
								  opacity: '1', // by default the close button has an opacity of 0.7
								  padding: '.4rem',
								  textAlign: 'center',
								  right: '34px', top: '4px', // button repositioning
								  border: '5px solid #282828', // increasing button border and new color
								  'border-radius': '13px', // circular effect
								  'box-shadow': '0 0 5px black' // 3D effect to highlight the button
								  });

							   var iwBackground = iwOuter.prev()

							   iwBackground.children(':nth-child(2)').css({'display' : 'none'})

							   iwBackground.children(':nth-child(4)').css({'display' : 'none'})
							})

								parkingInfoWindow.setContent(parkingInfoWindowContent)
								parkingInfoWindow.setPosition(marker.position)

								parkingInfoWindows.push(parkingInfoWindow)

								parkingInfoWindow.open(map)

							})
						})
					})

					map.setMapTypeId('dark')
					map.setZoom(16)

					// map.panBy(100,0)

					// console.log('parking data', slicedFilteredParkingData)
				
				
					var parkingCircleCenter = {
						lat: parkingSearchLat,
						lng: parkingSearchLng
					}

					parkingSearchCircle = new google.maps.Circle({
					      
					      strokeColor: '#FF4B3B',
					      strokeOpacity: 0.3,
					      strokeWeight: 3,
					      fillColor: '#FF4B3B',
					      fillOpacity: 0.1,
					      map: map,
					      center: parkingCircleCenter,
					      radius: 800,
					})

					    parkingSearchCircle.setMap(map)
			}

			else {

				alert('No Additional Parking Available')

				return
			}
		})
	}

//FUNCTIONS =====================================================================================================================================

	var callNewModal = function(){

		$('#locationTextField').val('')
		$('.modal').modal('show')
		$('.modal').on('shown.bs.modal', function() {
			$("#locationTextField").focus();
		})
	}

	var repaintAllClusters = function(){

		restaurantsMarkerCluster.repaint()
		entertainmentMarkerCluster.repaint()
		recreationMarkerCluster.repaint()
		shoppingMarkerCluster.repaint()
	}

	var toggleLegend = function(){

		$('#legendContainer').collapse('toggle')
	}

	var clearInfoWindows = function(){

		for(var i = 0; i < restaurantsInfoWindows.length; i++){

			restaurantsInfoWindows[i].close()
		}

		for(var i = 0; i < entertainmentInfoWindows.length; i++){

			entertainmentInfoWindows[i].close()
		}

		for(var i = 0; i < recreationInfoWindows.length; i++){

			recreationInfoWindows[i].close()
		}
	
		for(var i = 0; i < shoppingInfoWindows.length; i++){

			shoppingInfoWindows[i].close()
		}	
	}

	var clearPlaceInfoWindows = function(){

		if(placeInfoWindow !== undefined){

			placeInfoWindow.close()
		}

		for(var i = 0; i < placeInfoWindows.length; i++){

			placeInfoWindows[i].close()
		}

		placeInfoWindows.length = 0
	}

	var clearParkingInfoWindows = function(){

		for(var i = 0; i < parkingInfoWindows.length; i++){

			parkingInfoWindows[i].close()
		}
	}

	var clearFocusWindow = function(){

		$('#focusWindowPhoto').attr('src', '')
		$('#focusWindowName').text('')
		$('#focusWindowWebsite').attr('href', '')
		$('#focusWindowFacebook').attr('href', '')
		$('#focusWindowPhone').text('')
		$('#focusWindowDescription').text('')
		$('#focusWindowHoursList').empty()
		$('#showOnMapButton').empty()
	}

	var resetCheckboxes = function(){

		$('#foodCheckbox').prop('checked', true)
		$('#artsCheckbox').prop('checked', true)
		$('#fitnessCheckbox').prop('checked', true)
		$('#shoppingCheckbox').prop('checked', true)
	}

	var resetZoom = function(){

		showMarkers()

		clearPlaceInfoWindows()

		clearParkingInfoWindows()

  		clearInfoWindows()

  		clearParkingMarkers()

  		toggleRestaurants()

  		toggleEntertainment()

  		toggleRecreation()

  		toggleShopping()

  		if(centerMarker !== null){
  			
  			hideCenterMarker()
  		}

		map.setMapTypeId('dark')

		if(parkingSearchCircle){

			parkingSearchCircle.setMap(null)
		}
  			
  		map.setCenter(place.geometry.location)

 	  	// if(document.getElementById('focusWindow').style.visibility === "visible"){

	    // 	// map.panBy(100,0)
    	// }

		if(map.getZoom() !== 14) {
  				
  			map.setZoom(14)
  		}
	}

	var clearParkingMarkers = function(){

		// console.log(parkingMarkers)
		if(parkingSearchCircle){

			parkingSearchCircle.setMap(null)
		}

		for(var i = 0; i < parkingMarkers.length; i++){

			parkingMarkers[i].setVisible(false)
			parkingMarkers[i].setMap(null)
		}
	}

	var hideMarkers = function(){

		for (var i in restaurantsMarkers) {
		    
		    restaurantsMarkers[i].setVisible(false)
		}

		for (var i in entertainmentMarkers) {
		    
		    entertainmentMarkers[i].setVisible(false)
		}

		for (var i in recreationMarkers) {
		    
		    recreationMarkers[i].setVisible(false)
		}

		for (var i in shoppingMarkers) {
		    
		    shoppingMarkers[i].setVisible(false)
		}
	}

	var showMarkers = function(){

		for (var i in restaurantsMarkers) {
		    
		    restaurantsMarkers[i].setVisible(true)
		}

		for (var i in entertainmentMarkers) {
		    
		    entertainmentMarkers[i].setVisible(true)
		}

		for (var i in recreationMarkers) {
		    
		    recreationMarkers[i].setVisible(true)
		}

		for (var i in shoppingMarkers) {
		    
		    shoppingMarkers[i].setVisible(true)
		}
	}

	var hideCenterMarker = function(){

 		for(var i in centerMarkers) {
			 
			centerMarkers[i].setVisible(false)
  			centerMarkers[i].setMap(null)
  		}

  		centerMarkers = []
	}

	var checkFocusWindowVisibility = function(){

			if(document.getElementById('focusWindow').style.visibility === 'visible' && $(window).width() > 1024) {

				$('#focusWindow').css('width', '25vw')
				$('#main').css({
					'width' : '75vw',
					'marginLeft' : '25vw',
					'marginRight' : '0',
					})
			}

			else if(document.getElementById('focusWindow').style.visibility === 'visible' && $(window).width() > 768 && $(window).width() < 1024) {

				$('#focusWindow').css('width', '35vw')
				$('#main').css({
					'width' : '65vw',
					'marginLeft' : '35vw',
					'marginRight' : '0',
					})
			}

			else if(document.getElementById('focusWindow').style.visibility === 'visible' && $(window).width() > 512 && $(window).width() < 768) {

				$('#focusWindow').css('width', '40vw')
				$('#main').css({
					'width' : '60vw',
					'marginLeft' : '40vw',
					'marginRight' : '0',
					})
			}

			else if(document.getElementById('focusWindow').style.visibility === 'visible' && $(window).width() < 512) {

				$('#focusWindow').css('width', '50vw')
				$('#main').css({
					'width' : '50vw',
					'marginLeft' : '50vw',
					'marginRight' : '0',
					})
			}

			else {

				$('#main').css({
					'width' : '95vw',
					'margin' : 'auto',
					
				})
			}
	}


	




	



