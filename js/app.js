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
  $(document).ready(()=>{
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
