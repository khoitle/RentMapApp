var map;
var layer;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    minZoom: 7,
    center: {lat: 38.9072, lng: -77.0369},
    mapTypeId: 'roadmap',
    scaleControl: true
  });
  var layer = new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    query: {
      select: 'geometry',
      from: '1oUHvuUMkzN23i9l59qfpJfUhltfH5cpPdNasx6Al'
    },
    styles: [{
      polygonOptions: {
        fillColor: '#00FF00',
        strokeColor: '#000000',
        strokeOpacity: 0.1,
        fillOpacity: 0.2
      }
    }, {
      where: "'Rent' > 988",
      polygonOptions: {
        fillColor: '#adff2f'
      }
    }, {
      where: "'Rent' > 1193",
      polygonOptions: {
        fillColor: '#FFFF00'
      }
    }, {
      where: "'Rent' > 1411",
      polygonOptions: {
        fillColor: '#FFA500'
      }
    }, {
      where: "'Rent' > 1842",
      polygonOptions: {
        fillColor: '#FF0000'
      }
    }]
  });
  layer.setMap(map);
  layer.enableMapTips({
    select: "'ZIP','Rent'", // list of columns to query, typially need only one column.
    from: '1oUHvuUMkzN23i9l59qfpJfUhltfH5cpPdNasx6Al', // fusion table name
    geometryColumn: 'geometry', // geometry column name
    suppressMapTips: false, // optional, whether to show map tips. default false
    delay: 100, // milliseconds mouse pause before send a server query. default 300.
    tolerance: 8, // tolerance in pixel around mouse. default is 6.
    googleApiKey: 'AIzaSyBNYErfLDCAvSnyYNvLIVMQWo45_L6zE1E',
    htmlTemplate: function(rows) {
      return '<b>ZIP: </b>' + rows[0][0] + '<br><b>Median Rent: </b>'+rows[0][1];
    }
  });

  google.maps.event.addListener(layer, 'click', function(fEvent) {
    var ZIPVal = fEvent.row['ZIP'].value;
    var rentVal = fEvent.row['Rent'].value;
    console.log(ZIPVal, rentVal)
  });


  //SEARCH FEATURE/////////////////////////////////////////////////////////////////////////////

  function initAutocomplete() {

    // var map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: 38.9072, lng: -77.0369},
    //   zoom: 12,
    //   minZoom: 5,
    //   mapTypeId: 'roadmap'
    // });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    console.log(input)
    var searchBox = new google.maps.places.SearchBox(input);
    console.log("initAutocomplete")
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  initAutocomplete()
}

initMap()