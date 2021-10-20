// API key = AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc
/*
- ******************************* dont forget to set height and width, else the map doesnt appear********************************************************
- for now, i've set that the map is center around the first marker on the map, can change it by changing firstCenter
- we will need to put an array of markers so markers = [{lat: , lng:, title:, description:, image:}, ect] in markers
- we will have to do the action="" for the add collaborators and dont forget to cancel the normal action of refreshing
- there is CSS in the file like inline of the html, need to put it in a css file
*/

// these are the main variable
const markers = [];
let firstCenter = { lat: 45.5017, lng: -73.5673 };

// this is the HTML ton include the map and every marker with each of their content
const createMap = (mapId) => {
  return `
  <div id="floating-panel">
    <input id="delete-markers" type="button" value="Delete Markers" />
  </div>
  <div id="map" class="map" style="height:400px; width:600px;"></div>
  <section class="new-marker" style="display: none">
    <form id="new-marker-form">
      <input name="title" id="marker-title" placeholder="Marker Title" />
      <textarea name="description" id="marker-description" placeholder="Marker Description"></textarea>
      <input name="imageURL" id="marker-image" placeholder="Marker Image URL" />
      <select name="icon" id="icon">
        <option value="beach">Beach</option>
        <option value="park">Parks</option>
        <option value="restaurant">Restaurant</option>
        <option value="movie">Movie</option>
      </select>
      <button id="marker-btn">Create Marker</button>
    </form>

  </section>

  <script>
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    firstCenter = {lat:position.coords.latitude, lng:position.coords.longitude};
  }
  let map;

  function initMap() {
    const options = {
      zoom: 9,
      center: firstCenter
    };
    const map = new google.maps.Map(document.getElementById('map'), options);

    function addMarker (props) {

      const content = "<p>" + props.title + "</p>" + "<br /><p>" + props.description + "</p>" + '<a href="#"/>' + props.image + '</a>';

      const coords = new google.maps.LatLng(props.lat, props.lng);
      const marker = new google.maps.Marker({
        position: coords,
        map,
        icon: props.icon,
        animation: google.maps.Animation.DROP,
        draggable: true
      });
      const infoWindow = new google.maps.InfoWindow({
        content: content
      });
      marker.addListener('click', function (){
        infoWindow.open(map, marker)
      });
      markers.push(props);
      console.log(markers);
    }

    function setMarkerInfo(marker){
      const id = marker.id;
      const title = marker.title;
      const description = marker.description;
      const image = marker.img_url;
      const icon = marker.icon_url;
      const lat = marker.lat;
      const lng = marker.lng;
      const props = { id, title, description, image, icon, lat, lng };
      addMarker(props);
    }
    map.addListener('click', event1 => {
      $('.new-marker').show().slideDown('slow', () => {
        $('#marker-title').focus();
        $('#new-marker-form').on("submit", (event2) => {
          event.preventDefault();
          const lat = event1.latLng.lat();
          const lng = event1.latLng.lng();
          const mapId1 = ${mapId};
          const data = $('#new-marker-form').serialize() + '&lat=' + JSON.stringify(lat) + '&lng=' + JSON.stringify(lng) + '&mapId=' + JSON.stringify(mapId1);
          console.log('data', data);
          setMarker(data)
          .then(json => {
            console.log("inside setmarker client")
            setMarkerInfo(json.marker);
            console.log("setmarker", json.marker);
          });
          $('.new-marker').show().slideUp();
        });
      });
    });
  }
</script>
<script
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc&callback=initMap&v=weekly"async></script>
</div>`;
};


// this is the listing of all the marker under the map
  const renderAllMarkers = (markers) => {
   let allMarkers = `
   <table class="table">
   <thead>
     <tr>
       <th scope="col">Title</th>
       <th scope="col">Image</th>
       <th scope="col">Description</th>
       <th scope="col">Edit</th>
       <th scope="col">Delete</th>
     </tr>
   </thead>
   <tbody>
   `;
    markers.forEach((mark) => {
      allMarkers += `
          <tr>
            <td>${mark.title}</td>
            <td>change this to a img src= ${mark.image}</td>
            <td>${mark.description}</td>
            <td>
            <form>
              <button type="Delete" id="deleteMarker" data-id="${mark.id}">Delete</button>
              <button type="Edit" id="editMarker" data-id="${mark.id}">Edit</button>
            </form>
            </td>
          </tr>
          `;
    });
    allMarkers +=
    `</tbody>
    </table>`;
    return allMarkers;
  };

    $(() => {
      // const $map = $(`
      // <div id="showMap">
      // <h1>we need to put the map title here</h1>
      // ${createMap}
      // ${renderAllMarkers(markers)}
      // </div>
      // `);

      // window.$map = $map;

      $(document).on('click', '#deleteMarker', function(e){
        e.preventDefault();
        deleteMarker($(this).attr("data-id"))
        .then(() => {
          const $main = $("#main-content");
          $main.empty();
          $map.appendTo($main);
        });
      });
});

$(() => {
  const $mapWrapper = $(`<div class='map-wrapper'></div>`);
  const makeMap = (mapId) => {
    const $map = $(`
    <h1>My map</h1>
    ${createMap(mapId)}
  `);
   return $map;
  };

  window.$mapWrapper = $mapWrapper;
  window.makeMap = makeMap;
});

