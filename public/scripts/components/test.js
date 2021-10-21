// let map;

//   function initMap() {
//     const options = {
//       zoom: 9,
//       center: firstCenter,
//     };
//     map = new google.maps.Map(document.getElementById('map'), options);

//     function addMarker (props) {

//       const content = "<p>" + props.title + "</p>" + "<br /><p>" + props.description + "</p>" + '<a href="#"/>' + props.image + '</a>';

//       const coords = new google.maps.LatLng(props.lat, props.lng);
//       const marker = new google.maps.Marker({
//         position: coords,
//         map,
//         icon: props.icon,
//         animation: google.maps.Animation.DROP,
//         draggable: true
//       });
//       const infoWindow = new google.maps.InfoWindow({
//         content: content
//       });
//       marker.addListener('click', function (){
//         infoWindow.open(map, marker)
//       });
//       markers.push(props);
//       console.log("markers in map: ",markers);
//     }
