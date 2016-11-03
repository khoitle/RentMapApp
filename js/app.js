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
    FavoritesControllerFunction
  ])
  .factory("FavoriteFactory", [
    "$resource",
    FavoriteFactoryFunction
  ])

function FavoriteFactoryFunction($resource) {
  return $resource("https://evening-woodland-89369.herokuapp.com/places/:zip.json")
}

// "http://localhost:3000/places/:zip.json"


function HomeControllerFunction(){

}

function MapControllerFunction(FavoriteFactory){
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
      }
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
  $(document).ready(() =>{
    initMap()
    console.log('fire')
  })

  this.create = function(){
    this.favorite = new FavoriteFactory({name: areaName, state: state, zip: ZIPVal, rent: rentVal})
    console.log(this.favorite)
    this.favorite.$save()
  }
}

function FavoritesControllerFunction(FavoriteFactory ){
  this.favorites = FavoriteFactory.query();
  // console.log(this.favorites)

  this.delete = function(favorite){
    console.log(this.favorites)
    console.log(favorite)
    // this.favorites.$remove(favorite)
    favorite.$remove({zip: favorite.zip})
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
