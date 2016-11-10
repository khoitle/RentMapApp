// NHO: reminder to remove unused / commented out code

// // function performSearch(ZIPbound) {
// //   var ZIPVal = ZIPbound.row['ZIP'].value;
// //   var request = {
// //     location: ZIPVal,
// //     radius: '1609'
// //   };
// //   service.radarSearch(request, callback);
// // }
//
// // map.getBounds(),
//
// function callback(results, status) {
//   if (status !== google.maps.places.PlacesServiceStatus.OK) {
//     console.error(status);
//     return;
//   }
//   for (var i = 0, result; result = results[i]; i++) {
//     addMarker(result);
//   }
// }
//
// function addMarker(place) {
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     icon: {
//       url: 'http://maps.gstatic.com/mapfiles/circle.png',
//       anchor: new google.maps.Point(10, 10),
//       scaledSize: new google.maps.Size(10, 17)
//     }
//   });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     service.getDetails(place, function(result, status) {
//       if (status !== google.maps.places.PlacesServiceStatus.OK) {
//         console.error(status);
//         return;
//       }
//       infoWindow.setContent(result.name);
//       infoWindow.open(map, marker);
//     });
//   });
// }
