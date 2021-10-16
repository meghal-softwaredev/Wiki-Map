$(() => {
  console.log("we are here");
  const $test = $(`<p>This is a test.</p>`);

  $("#main").append($test);
});
