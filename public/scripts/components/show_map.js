// API key = AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc
/*
- ******************************* dont forget to set height and width, else the map doesnt appear********************************************************
- for now, i've set that the map is center around the first marker on the map, can change it by changing firstCenter
- we will need to put an array of markers so markers = [{lat: , lng:, title:, description:, image:}, ect] in markers
- we will have to do the action="" for the add collaborators and dont forget to cancel the normal action of refreshing
- there is CSS in the file like inline of the html, need to put it in a css file
*/

// these are the main variable
const markers = [{lat:45.5017, lng:-73.5673, title:'hello', description:'try 1', image:'thats a link'}, {lat:45.6930, lng:-73.6331, title:'haloa', description:'try 2', image:'thats a linksss'}]
const firstCenter = {lat:markers[0].lat, lng:markers[0].lng};

// this is the HTML ton include the map and every marker with each of their content
const createMap = `
<div id="map" style="height:400px; width:400px;">
<script>
  function initMap() {
    const options = {
      zoom:9,
      center: firstCenter
    };
    const map = new google.maps.Map(document.getElementById('map'), options);
    function addMark (coords) {
      const content = "<h2>" + coords.title + "</h2>";
      const marker = new google.maps.Marker({
        position:{lat:coords.lat, lng:coords.lng},
        map:map
      })
      const infoWindow = new google.maps.InfoWindow({
        content: content
      });
      marker.addListener('click', function (){
        infoWindow.open(map, marker)
      })
    }
    markers.forEach(mark => {
      addMark(mark)
    })
  }
</script>
<script
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc&callback=initMap&v=weekly"async></script>
</div>`;


// this is the listing of all the marker under the map
const renderAllMarkers = (markers) => {
  let allMarkers = `<h1>there is all of your markers</h1>`;
  markers.forEach((mark) => {
    allMarkers += `
    <article style="display:flex; flex-direction:row; justify-content:space-between;">
      <h2>${mark.title}</h2>
      <p>change this to a img src= ${mark.image}</p>
      <p>${mark.description}</p>
    </article>`;
  });
  return allMarkers;
};

$(() => {
  const $main = $('#main-content');
  const $map = $(`
  <h1>My map</h1>
    ${createMap}
    ${renderAllMarkers(markers)}
  `);
  window.$map = $map;
});
