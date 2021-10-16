getMyDetails = () => {
  console.log("getMyDetails");
  return $.ajax({
    url: "/maps/:id",
  });
};

signUp = (data) => {
  return $.ajax({
    method: "POST",
    url: "/users",
    data,
  });
};
