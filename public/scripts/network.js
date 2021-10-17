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
