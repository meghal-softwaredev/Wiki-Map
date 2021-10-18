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
  console.log("getuser");
  return $.ajax({
    url: "/api/users/info",
  });
}
function logOut() {
  return $.ajax({
    method: "POST",
    url: "/api/users/logout",
  })
}
function getFavouriteMaps() {
  return $.ajax({
    url: "/api/users/favourite",
  })
}
function getContributedMaps() {
  return $.ajax({
    url: "/api/users/contributed",
  })
}

function createNewMap(data) {
  return $.ajax({
    method: "POST",
    url: "api/maps/new",
    data
  });
}

function deleteMarker(id) {
  return $.ajax({
    method: "POST",
    url: "api/maps/deleteMarker",
    id
  });
}
