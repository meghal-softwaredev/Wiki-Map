// navigator.geolocation.getCurrentPosition(showPosition);

// function showPosition(position) {
//   firstCenter = {
//     lat: position.coords.latitude,
//     lng: position.coords.longitude,
//   };
// }
// function initMap(pointers) {
//   const options = {
//     zoom: 9,
//     center: firstCenter,
//   };
//   const map = new google.maps.Map(document.getElementById("map"), options);
//   function addMark(coords) {
//     const content = "<h2>" + coords.title + "</h2>";
//     const marker = new google.maps.Marker({
//       position: { lat: coords.lat, lng: coords.lng },
//       map: map,
//     });
//     const infoWindow = new google.maps.InfoWindow({
//       content: content,
//     });
//     marker.addListener("click", function () {
//       infoWindow.open(map, marker);
//     });
//   }
//   pointers.forEach((mark) => {
//     addMark(mark);
//   });
// }

// function setMarkerInfo(marker) {
//   const id = marker.id;
//   const title = marker.title;
//   const description = marker.description;
//   const image = marker.img_url;
//   const icon = marker.icon_url;
//   const lat = marker.lat;
//   const lng = marker.lng;
//   const props = { id, title, description, image, icon, lat, lng };
//   addMarker(props);
// }
// map.addListener("click", (event1) => {
//   $(".new-marker")
//     .show()
//     .slideDown("slow", () => {
//       $("#marker-title").focus();
//       $("#new-marker-form").on("submit", (event2) => {
//         event2.preventDefault();
//         const lat = event1.latLng.lat();
//         const lng = event1.latLng.lng();
//         const mapId1 = mapId;
//         const data =
//           $("#new-marker-form").serialize() +
//           "&lat=" +
//           JSON.stringify(lat) +
//           "&lng=" +
//           JSON.stringify(lng) +
//           "&mapId=" +
//           JSON.stringify(mapId1);
//         setMarker(data).then((json) => {
//           setMarkerInfo(json.marker);
//         });
//         $(".new-marker").show().slideUp();
//       });
//     });
// });
