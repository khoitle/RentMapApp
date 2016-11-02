angular
  .module("rentApp", [
    "ui.router"
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
    FavoritesControllerFunction
  ])

function HomeControllerFunction(){

}
function MapControllerFunction(){
  $(document).ready(()=>{
    initMap()
    console.log('fire')
  })
}
function FavoritesControllerFunction(){

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
}
