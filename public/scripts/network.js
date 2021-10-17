function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/register",
    data
  });
}

function createNewMap(data) {
  return $.ajax({
    method: "POST",
    url: "/api/maps/new",
    data
  });
}
