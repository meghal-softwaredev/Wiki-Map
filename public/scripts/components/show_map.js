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
console.log("markers:", markers);
let firstCenter = { lat: 45.5017, lng: -73.5673 };

// google map set up
function showPosition(position) {
  firstCenter = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
}

let map;
let lat;
let lng;

function setMarkerInfo(markers) {
  for (const marker of markers) {
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
}

function addMarker(props) {
  const content = `
  <div class="info-window">
    <h2>${props.title}</h2>
    <p>${props.description}</p>
    <div class="info-img-wrapper">
      <img src=${props.image} alt="user image of location"/>
    </div>
  </div>`;

  const coords = new google.maps.LatLng(props.lat, props.lng);
  const marker = new google.maps.Marker({
    position: coords,
    map,
    icon: props.icon,
    animation: google.maps.Animation.DROP,
    draggable: true,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: content,
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
  markers.push(props);
}

function initMap(mapId, pointer) {
  const options = {
    zoom: 9,
    center: firstCenter,
  };
  map = new google.maps.Map(document.getElementById("map"), options);

  setMarkerInfo(pointer);

  $("#new-marker-form").on("submit", (event2) => {
    event2.preventDefault();
    const mapId1 = mapId;
    const data =
      $("#new-marker-form").serialize() +
      "&lat=" +
      JSON.stringify(lat) +
      "&lng=" +
      JSON.stringify(lng) +
      "&mapId=" +
      JSON.stringify(mapId1);
    setMarker(data).then((json) => {
      setMarkerInfo([json.marker]);
    });
    getUser()
        .then((json) => {
          addContributors(json.user.id, mapId1);
        })
    $(".new-marker").show().slideUp();
    views_manager.show("showMap", { mapId: mapId1 });
  });

  map.addListener("click", (event1) => {
    lat = event1.latLng.lat();
    lng = event1.latLng.lng();
    $(".new-marker")
      .show()
      .slideDown("slow", () => {
        $("#marker-title").focus();
      });
  });
}

// this is the HTML ton include the map and every marker with each of their content
const createMap = () => {
  return `
  <div id="map" class="map" style="height:600px; width:100%;"></div>
  <section class="new-marker" style="display: none">
    <form id="new-marker-form">
      <h2>Create your marker:</h2>
      <input name="title" id="marker-title" class="form-control" placeholder="Marker Title" />
      <textarea name="description" id="marker-description" class="form-control" placeholder="Marker Description"></textarea>
      <input name="imageURL" id="marker-image" class="form-control" placeholder="Marker Image URL" />
      <select name="icon" id="icon">
        <option value="beach">Beach</option>
        <option value="park">Parks</option>
        <option value="restaurant">Restaurant</option>
        <option value="movie">Movie</option>
      </select>
      <button id="marker-btn">Create</button>
    </form>
  </section>
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
            <td class="table-img"><img src="${mark.img_url}"></td>
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
    return " ";
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

    markers.splice([]);
    navigator.geolocation.getCurrentPosition(showPosition);

    const $map = $(`
      <div class="title-like">
        <h2>${map.title}</h2>
        ${createButton(mapFavourite.id, mapPoints)}
      </div>
      <div class='google-map'>
        ${createMap(map.id, mapPoints)}
      </div>
      <div class='points'>
        ${listAllMarkers(mapPoints)}
      </div>
  `);

    setTimeout(() => {
      initMap(map.id, mapPoints);
    }, 5);

    $(document).on("click", "#favourite-btn", (event) => {
      event.preventDefault();
      const $btn = $("#favourite-heart");
      const redHeart = "favourited-map";

      if ($($btn).hasClass(redHeart)) {
        $($btn).removeClass(redHeart);
        deleteLike(map.id);
        views_manager.show("showMap", { mapId: map.id });
      } else {
        $($btn).addClass(redHeart);
        addLike(map.id);
        views_manager.show("showMap", { mapId: map.id });
      }
    });

    $(document).on("click", "#deleteMarker", function (e) {
      e.preventDefault();
      getUser()
        .then((json) => {
          addContributors(json.user.id, map.id);
        })
        .then(() => {
          deleteMarker($(this).attr("data-id"));
        })
        .then(() => {
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
                <td><input required class="form-control" form="saving" type="text" id="title" name="title" value="${titre}"></td>
                <td><input required class="form-control" form="saving" type="text" id="image" name="image" value="${img}"></td>
                <td><input required class="form-control" form="saving" type="text" id="description" name="description" value="${desc}"></td>
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
          addContributors(json.user.id, map.id);
        })
        .then(() => {
          editMarker(data);
        })
        .then(() => {
          views_manager.show("showMap", { mapId: map.id });
        });
    });

    return $map;
  });
};
