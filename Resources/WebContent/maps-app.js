/* Map functions */

var map;

function initMap() {
  // set up the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(45,-120),
    zoom: 10
  });
map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
        position: latLng,
        map: map
        });
      map.panTo(latLng);
      }
function loadGeoJsonString(geoString) {
  var geojson = JSON.parse(geoString);
  map.data.addGeoJson(geojson);
  zoom(map);
}
function zoom(map) {
  var bounds = new google.maps.LatLngBounds();
  map.data.forEach(function(feature) {
    processPoints(feature.getGeometry(), bounds.extend, bounds);
  });
  map.fitBounds(bounds);
}
function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function(g) {
      processPoints(g, callback, thisArg);
    });
  }
}


/* DOM (drag/drop) functions */

function initEvents() {
  // set up the drag & drop events
  var mapContainer = document.getElementById('map');
  var dropContainer = document.getElementById('drop-container');

  // map-specific events
  mapContainer.addEventListener('dragenter', showPanel, false);

  // overlay specific events (since it only appears once drag starts)
  dropContainer.addEventListener('dragover', showPanel, false);
  dropContainer.addEventListener('drop', handleDrop, false);
  dropContainer.addEventListener('dragleave', hidePanel, false);
}

function showPanel(e) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById('drop-container').style.display = 'block';
  return false;
}

function hidePanel(e) {
  document.getElementById('drop-container').style.display = 'none';
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  hidePanel(e);

  var files = e.dataTransfer.files;
  if (files.length) {
    // process file(s) being dropped
    // grab the file data from each file
    for (var i = 0, file; file = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = function(e) {
        loadGeoJsonString(e.target.result);
      };
      reader.onerror = function(e) {
        console.error('reading failed');
      };
      reader.readAsText(file);
    }
  } else {
    // process non-file (e.g. text or html) content being dropped
    // grab the plain text version of the data
    var plainText = e.dataTransfer.getData('text/plain');
    if (plainText) {
      loadGeoJsonString(plainText);
    }
  }

  // prevent drag event from bubbling further
  return false;
}
function initialize() {
  initMap();
  initEvents();
}