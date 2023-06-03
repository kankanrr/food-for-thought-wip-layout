let map;
let service;
let infowindow;
let lat;
let long;
let userLocation;

function centerMapOnUserLocation(position) {
  //getting user location
  userLocation = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 15,
  });
  //putting the markers on the map
  drawLocaationMarkers();
}

function drawLocaationMarkers() {
  const request = {
    //finding stores in a 5kilometer radius
    location: userLocation,
    radius: '10000',
    type: ["supermarket"],
  }

  service = new google.maps.places.PlacesService(map);
  console.log(service);
  service.nearbySearch(request, (results, status) => {
    console.log(results);
    console.log(status);
    console.log(google.maps.places.PlacesServiceStatus);
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        +createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function initMap() {
  // get user location

  navigator.geolocation.getCurrentPosition(centerMapOnUserLocation);
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const icon = {
    url: "./assets/images/grocery.png", // Provide the path to our custom icon image
    scaledSize: new google.maps.Size(50, 50), // Adjust the size of the icon as needed
  };

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: icon, //Set the custom icon for the marker
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;
