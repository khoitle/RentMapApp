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
  return $resource("http://localhost:3000/places/:zip.json")
}



function HomeControllerFunction(){

}
function MapControllerFunction(){
  this.filters = []
  this.renderFilters = () => {
    this.filters.forEach((filter) => {
      var icon = 'null'
      switch(filter) {
        case 'restaurants':
          icon = 'dining.png'
          break;
        case 'groceries':
          icon = 'convenience.png'
          break;
        case 'gyms':
          icon = 'cycling.png'
          break;
        case 'schools':
          icon = 'ranger_station.png'
          break;
        case 'bars':
          icon = 'bars.png'
          break;
      }
      console.log(icon)
    })
  }
  this.addFilter = (filter) => {
    console.log(filter)
    this.filters.push(filter)
    this.renderFilters()
  }
  $(document).ready(() =>{
    initMap()
    console.log('fire')
  })
}
function FavoritesControllerFunction( FavoriteFactory ){
  this.favorites = FavoriteFactory.query();
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
