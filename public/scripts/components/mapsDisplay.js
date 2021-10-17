{
  /* <section id="maps-display">
<h1>Your Maps</h1>
<div class="map-item">
  <img src="" alt="" />
  <div class="map-info">
    <h3 class="title"></h3>
    <p class="description"></p>
  </div>
  <div class="like-button">
    <i class="fas fa-heart"></i>
  </div>
  <button>Edit</button>
  <button>Delete</button>
</div>
</section> */
}
$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>Your Maps</h1>
  </section>
  `);
  window.$mapsDisplay = $mapsDisplay;
  // window.mapsDisplay = {};

  // function addMaps(mapsList) {
  //   $mapsDisplay.append(mapsList);
  // }
  // function clearMaps() {
  //   $mapsDisplay.empty();
  // }
  // window.mapsDisplay.clearMaps = clearMaps;

  const renderAllMaps = (mapsData) => {
    console.log("render all maps");
    console.log("maps data from query:", mapsData);
    mapsData.forEach((map) => {
      $mapsDisplay.append(`
      <article class="user-map">
        <div class="map-item">
          <img src="" alt="" />
          <div class="map-info">
            <h3 class="title">${map.title}</h3>
            <p class="description">${map.description}</p>
          </div>
          <div class="like-button">
            <i class="fas fa-heart"></i>
          </div>
          <button>Edit</button>
          <button>Delete</button>
        </div>`);
    });
  };

  getUserMaps()
    .then((json) => {
      const userMaps = json.userMaps;
      return userMaps;
    })
    .then((userMaps) => {
      renderAllMaps(userMaps);
    });
});
