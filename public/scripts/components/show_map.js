// API key = AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc
/*
- ******************************* dont forget to set height and width, else the map doesnt appear********************************************************
- for now, i've set that the map is center around the first marker on the map, can change it by changing firstCenter
- we will need to put an array of markers so markers = [{lat: , lng:, title:, description:, image:}, ect] in markers
- we will have to do the action="" for the add collaborators and dont forget to cancel the normal action of refreshing
- there is CSS in the file like inline of the html, need to put it in a css file
*/

// these are the main variable
const markers = [
  {
    id: 1,
    lat: 45.5017,
    lng: -73.5673,
    title: "hello",
    description: "try 1",
    image: "thats a link",
  },
  {
    id: 2,
    lat: 45.693,
    lng: -73.6331,
    title: "haloa",
    description: "try 2",
    image: "thats a linksss",
  },
];
let firstCenter = { lat: 45.5017, lng: -73.5673 };

// this is the HTML ton include the map and every marker with each of their content
const createMap = (mapId) => {
  return `
  <h1 class='map-id' data-id=${mapId}>${mapId}</h1>
<div id="map" class="map" style="height:400px; width:600px;"></div>
<section class="new-marker" style="display: none">
  <form id="new-marker-form">
    <input name="title" id="marker-title" placeholder="Marker Title" />
    <textarea name="description" id="marker-description" placeholder="Marker Description"></textarea>
    <input name="imageURL" id="marker-image" placeholder="Marker Image URL" />
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
      zoom:15,
      center: firstCenter
    };
     map = new google.maps.Map(document.getElementById('map'), options);

    function addMarker (props) {
      const content = "<h2>" + props.title + "</h2>";
      const marker = new google.maps.Marker({
        position: props.coords,
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
      markers.push(marker);
    }
    markers.forEach(mark => {
      addMarker(mark)
    })

    map.addListener('click', event => {
      //form SlideDown
      $('.new-marker').show().slideDown('slow', () => {
        $('#marker-title').focus();
        $('#new-marker-form').on("submit", (event) => {

          event.preventDefault();
          const data = $('#new-marker-form').serialize();
          console.log("", data);
          setMarker(data)
          .then(json => {

          });
          $('.new-marker').show().slideUp();
          });
    });

      const title = "test";
      const description = "Hello";
      const icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      const coords = event.latLng;
      const props = {
        title,
        description,
        icon,
        coords
      }
      addMarker(props);
    });
    document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);
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
            </form>
            </td>
          </tr>
          `;
  });
  allMarkers += `</tbody>
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

  $(document).on("click", "#deleteMarker", function (e) {
    e.preventDefault();
    deleteMarker($(this).attr("data-id")).then(() => {
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
    <button id="favourite-btn"><i id="favourite-heart" class="fas fa-heart favourited-map"></i></button>
    ${createMap(mapId)}
  `);

    return $map;
  };

  window.$mapWrapper = $mapWrapper;
  window.makeMap = makeMap;

  $(document).on("click", "#favourite-btn", (event) => {
    event.preventDefault();
    const $mapId = $(".map-id").attr("data-id");
    const $btn = $("#favourite-heart");
    const redHeart = "favourited-map";

    if ($($btn).hasClass(redHeart)) {
      $($btn).removeClass(redHeart);
      return deleteLike($mapId);
    }
    $($btn).addClass(redHeart);
    return addLike($mapId);
  });
});
