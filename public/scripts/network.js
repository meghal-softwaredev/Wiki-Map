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
function getFavouriteMaps() {
  return $.ajax({
    url: "/api/users/favourite",
  });
}
function getContributedMaps() {
  return $.ajax({
    url: "/api/users/contributed",
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
  console.log("network");
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
