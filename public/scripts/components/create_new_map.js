$(() => {
  const $createNewMap = $(`
  <section id="createNewMap">
    <h1>Create a new map</h1>
    <form id="createNewMapForm">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" placeholder="Enter the title">
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" placeholder="Enter a description">
      <label for="emailContributors">Email of contributors:</label>
      <input type="text" id="emailContributors" name="emailContributors" placeholder="Enter the email(s)">
      <button class="createNewMap">Create new map!</button>
    </form>
  </section>
  `)

  window.$createNewMap = $createNewMap;

  $createNewMap.on('submit', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    createNewMap(data)
    .then(json => {
      //header.update(json.user);
      views_manager.show('showMap');
    });
  });
});
