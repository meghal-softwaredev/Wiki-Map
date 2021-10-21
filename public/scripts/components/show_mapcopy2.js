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
const createMap = (mapId, pointer) => {
  return `
  <div id="map" style="width: 500px; height: 400px;"></div>

  <script type="text/javascript">
    var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  </script>

<script
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgE-0OBpY_KHAx8MKg9HOsKkDPnwd1JKc&callback=initMap&v=weekly"async></script>
</div>`;
};

// this is the listing of all the marker under the map
const listAllMarkers = (markers) => {
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
          <tr id="marker${mark.id}">
            <td>${mark.title}</td>
            <td><img src="${mark.image}"></td>
            <td>${mark.description}</td>
            <td>
              <form>
                <button type="Edit" id="editMarker" data-id="${mark.id}">Edit</button>
              </form>
            </td>
            <td>
              <form>
                <button type="Delete" id="deleteMarker" data-id="${mark.id}">Delete</button>
              </form>
            </td>
          </tr>
          `;
  });
  allMarkers += `</tbody></table>`;
  return allMarkers;
};

const createButton = (favouriteId) => {
  if (favouriteId === "not logged in") {
    return `<h1>NO LIKES</h1>`;
  }

  if (!favouriteId) {
    return `<button id="favourite-btn"><i id="favourite-heart" class="fas fa-heart"></i></button>`;
  }
  return `<button id="favourite-btn"><i id="favourite-heart" class="fas fa-heart favourited-map"></i></button>`;
};

var $mapWrapper = $(`<div class='map-wrapper'></div>`);
var mapFinal = (mapId) => {
  return getAllMapData(mapId).then((json) => {
    const map = json.map;
    const mapPoints = json.mapPoints;
    const mapFavourite = json.mapFavourite;

    const $map = $(`
      <div class="title-like">
      ${map.title}
      ${createButton(mapFavourite.id, mapPoints)}
      </div>
      <div class='google-map'>
        ${createMap(map.id)}
      </div>
      <div class='points'>
        ${listAllMarkers(mapPoints)}
      </div>
  `);

    /// edit delete like
    $(document).on("click", "#favourite-btn", (event) => {
      event.preventDefault();
      console.log("fav button clicked 💖💖💖");
      const $btn = $("#favourite-heart");
      const redHeart = "favourited-map";

      if ($($btn).hasClass(redHeart)) {
        $($btn).removeClass(redHeart);
        return deleteLike(map.id);
      }
      $($btn).addClass(redHeart);
      return addLike(map.id);
    });

    $(document).on("click", "#deleteMarker", function (e) {
      e.preventDefault();
      getUser()
        .then((json) => {
          console.log("adding cotrib");
          addContributors(json.user.id, map.id);
        })
        .then(() => {
          deleteMarker($(this).attr("data-id"));
        })
        .then(() => {
          console.log("wtf");
          $("#main-content").empty();
          views_manager.show("showMap", { mapId: map.id });
        });
    });

    $(document).on("click", "#editMarker", function (e) {
      e.preventDefault();
      const target = `#marker${$(this).attr("data-id")}`;
      const idOfPoint = $(this).attr("data-id");
      let titre;
      let desc;
      let img;
      for (let i = 0; i < mapPoints.length; i++) {
        if (mapPoints[i].id === Number(idOfPoint)) {
          desc = mapPoints[i].description;
          titre = mapPoints[i].title;
          img = mapPoints[i].img_url;
        }
      }
      $(target).html(`
              <form id="saving">
                <td><input required form="saving" type="text" id="title" name="title" value="${titre}"></td>
                <td><input required form="saving" type="text" id="image" name="image" value="${img}"></td>
                <td><input required form="saving" type="text" id="description" name="description" value="${desc}"></td>
                <td>
                  <button form="saving" type="submit" id="saveEditMarker" data-id="${$(
                    this
                  ).attr("data-id")}">Save</button>
                </td>
              </form>
              <td>
                <form>
                  <button type="Delete" id="deleteMarker" data-id="${$(
                    this
                  ).attr("data-id")}">Delete</button>
                </form>
              </td>`);
    });

    $(document).on("click", "#saveEditMarker", function (e) {
      e.preventDefault();
      let data = {
        update: $("#saving").serialize(),
        id: $(this).attr("data-id"),
      };
      getUser()
        .then((json) => {
          console.log("add contri", json);
          addContributors(json.user.id, map.id);
        })
        .then(() => {
          console.log("on edit");
          editMarker(data);
        })
        .then(() => {
          console.log("reload");
          $("#main-content").empty();
          views_manager.show("showMap", { mapId: map.id });
        });
    });

    return $map;
  });
};