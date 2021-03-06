$(() => {
  const $createNewMap = $(`
  <form id="createNewMapForm">
    <img src='../../assets/new_map_img.png' alt='user icon'>
    <div class="fullForm">
      <h1>Create a new map</h1>
      <label for="title">Title:</label>
      <input required type="text" id="title" class="form-control" name="title" placeholder="Enter a title">
      <label for="description">Description:</label>
      <input required type="text" id="description" class="form-control" name="description" placeholder="Enter a description">
      <button type="submit" class="createNew-button">Create new map!</button>
    </form>
  `);

  window.$createNewMap = $createNewMap;

  $createNewMap.on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    getUser()
      .then((json) => {
        data += `&owner_id=${json.user.id}`;
        return createNewMap(data);
      })
      .then((map) => {
        const $main = $("#main-content");
        const mapId = map.map.id;
        $main.empty();
        views_manager.show("showMap", { mapId });
      });
  });
});
