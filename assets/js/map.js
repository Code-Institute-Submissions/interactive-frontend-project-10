function initMap(latitude, longitude) {

  coordinates = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: coordinates
  });

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });
}