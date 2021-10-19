$(() => {
  const $createNewMap = $(`
  <form id="createNewMapForm">
    <img src='../../assets/new_map_img.png' alt='user icon'>
    <div class="fullForm">
      <h1>Create a new map</h1>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" placeholder="Enter a title">
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" placeholder="Enter a description">
      <button type="submit" class="createNew-button">Create new map!</button>
    </form>
  </form>
  `);

  window.$createNewMap = $createNewMap;

  $createNewMap.on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    getUser()
      .then((json) => {
        data += `&owner_id=${json.user.id}`;
        console.log(data);
        return createNewMap(data);
      })
      .then((map) => {
        console.log("map", map);
        const $main = $("#main-content");
        const mapId = map.map.id;
        // console.log("ID", mapId);
        $main.empty();
        views_manager.show("showMap", { mapId });
      });
  });
});
