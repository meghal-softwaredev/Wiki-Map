$(() => {
  const $createNewMap = $(`
  <form id="createNewMapForm">
      <h1>Create a new map</h1>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" placeholder="Enter the title">
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" placeholder="Enter a description">
      <button class="createNewMap">Create new map!</button>
    </form>
  `)

  window.$createNewMap = $createNewMap;

  $createNewMap.on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    getUser()
    .then((json) => {
      data += `&owner_id=${json.user.id}`;
      console.log(data)
      createNewMap(data)
    })
    .then(() => {
      const $main = $("#main-content");
      $main.empty();
      views_manager.show('showMap');
    });
  });
});
