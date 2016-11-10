angular
  .module("rentApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .controller("HomeController", [
    HomeControllerFunction
  ])
  .controller("MapController", [
    "FavoriteFactory",
    MapControllerFunction
  ])
  .controller("FavoritesController", [
    "FavoriteFactory",
    "$state",
    FavoritesControllerFunction
  ])
  .factory("FavoriteFactory", [
    "$resource",
    FavoriteFactoryFunction
  ])

function FavoriteFactoryFunction($resource) {
  return $resource("https://evening-woodland-89369.herokuapp.com/places/:zip.json")
}

// NHO: reminder to remove unused / commented out code
// "https://evening-woodland-89369.herokuapp.com/places/:zip.json"

// "http://localhost:3000/places/:zip.json"


function HomeControllerFunction(){
  // NHO: is this doing anything? if its just a static page you probably do not need a controller...
}

function MapControllerFunction(FavoriteFactory){
  // NHO: this controller is really bloated, especially with a lot of third-party code
  // is there any way to abstract this into different files?
  // NHO: could also move your data fetching logic to a custom service
  this.filters = []
  this.activeFilters = {
    restaurant: false,
    grocery_or_supermarket: false,
    gym: false,
    school: false,
    bar: false,
  }
  this.renderFilters = () => {
    markersArray.forEach((marker) => {
      marker.setMap(null)
    })
    this.filters.forEach((filter) => {
      var icon = 'null'
      // NHO: could use an object to map name of filters to images to reduce this code!
      switch(filter) {
        case 'restaurant':
          icon = 'dining.png'
          break;
        case 'grocery_or_supermarket':
          icon = 'convenience.png'
          break;
        case 'gym':
          icon = 'cycling.png'
          break;
        case 'school':
          icon = 'ranger_station.png'
          break;
        case 'bar':
          icon = 'bars.png'
          break;
        // NHO: might recommend setting a default for this switch statemet
      }
      // NHO: feel like we could move this code to map.js or some other utility file
      console.log(icon)
      var request = {
          location: searchLocation,
          radius: '1609',
          type: [filter]
        };
      service.radarSearch(request, callback);
      function callback(results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        for (var i = 0, result; result = results[i]; i++) {
          addMarker(result);
        }
      }
      function addMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: {
            url: `http://maps.google.com/mapfiles/kml/shapes/${icon}`,
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
          }
        });
        markersArray.push(marker)
        google.maps.event.addListener(marker, 'click', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              // NHO: might want to display to user some notification, like "No Results Found" etc...
              console.error(status);
              return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
          });
        });
      }

    })
  }
  this.addFilter = (filter) => {
    this.filters = []
    for(key in this.activeFilters){
      if(this.activeFilters[key]){
        this.filters.push(key)
      }
    }
    console.log(this.activeFilters)
    this.renderFilters()
  }
  // NHO: this works but would recommend doing this the "angular" way utilizing `ng-init`
  $(document).ready(() =>{
    initMap()
    console.log('fire')
  })

  this.create = function(){
    // NHO: where are areaName, state, ZIPVal, and rentVal defined?
    this.favorite = new FavoriteFactory({name: areaName, state: state, zip: ZIPVal, rent: rentVal})
    console.log(this.favorite)
    this.favorite.$save()
  }
}

function FavoritesControllerFunction(FavoriteFactory, $state){
  this.favorites = FavoriteFactory.query();
  // console.log(this.favorites)

  this.delete = function(favorite){
    // NHO: these console.logs are fine for during the development phase
    // but would remove them during production / before you show code to potential employers
    console.log(this.favorites)
    console.log(favorite)
    // this.favorites.$remove(favorite)
    favorite.$remove({zip: favorite.zip}).then(function(){
      $state.reload(); // NHO: nice!
    })

  }
}



function Router($stateProvider){
  $stateProvider
    .state("home", {
      url: "/home",
      controller: "HomeController",
      controllerAs: "vm",
      templateUrl: "js/ng-views/home.html"
    })
    .state("map", {
      url: "/map",
      controller: "MapController",
      controllerAs: "vm",
      templateUrl: "js/ng-views/map.html"
    })
    .state("favorites", {
      url: "/favorites",
      controller: "FavoritesController",
      controllerAs: "vm",
      templateUrl: "js/ng-views/favorites.html"
    })
}
