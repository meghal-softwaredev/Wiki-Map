function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/register",
    data,
  });
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/login",
    data,
  });
}
function getUser() {
  return $.ajax({
    url: "/api/users/info",
  });
}
function logOut() {
  return $.ajax({
    method: "POST",
    url: "/api/users/logout",
  });
}

function createNewMap(data) {
  return $.ajax({
    method: "POST",
    url: "/api/maps/new",
    data,
  });
}

function getUserMaps() {
  return $.ajax({
    url: "api/maps/all",
  });
}

function setMarker(data) {
  return $.ajax({
    method: "POST",
    url: "api/maps/marker/new",
    data,
  });
}

function deleteMarker(id) {
  return $.ajax({
    method: "POST",
    url: "api/maps/deleteMarker",
    data: { id },
  });
}

function deleteLike(mapId) {
  return $.ajax({
    method: "POST",
    url: "api/maps/like/delete",
    data: { mapId },
  });
}

function addLike(mapId) {
  return $.ajax({
    method: "POST",
    url: "api/maps/like/add",
    data: { mapId },
  });
}

function getAllMapData(mapId) {
  return $.ajax({
    url: "api/maps/all/id",
    data: { mapId },
  });
}

function getUserProfile() {
  return $.ajax({
    url: "api/maps/userProfile",
  });
}

function addContributors(userId, mapId) {
  return $.ajax({
    method: "POST",
    url: "api/users/addContributors",
    data: { userId, mapId },
  });
}

function editMarker(data) {
  return $.ajax({
    method: "POST",
    url: "api/maps/marker/edit",
    data: { data },
  });
}

////////////////////////////////////////////
// function renderMarkers(data) {
//   return $.ajax({
//     url: "api/maps/getMarkers",
//   });
// }
