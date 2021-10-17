function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/register",
    data
  });
}
