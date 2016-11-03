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
  return $resource("http://localhost:3000/places/:zip.json")
}


function HomeControllerFunction(){

}

function MapControllerFunction(FavoriteFactory){
  $(document).ready(()=>{
    initMap()
    console.log('fire')
  })

  this.create = function(){
    this.favorite = new FavoriteFactory({name: areaName, state: state, zip: ZIPVal, rent: rentVal})
    console.log(this.favorite)
    this.favorite.$save()
  }
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
