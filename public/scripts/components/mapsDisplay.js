$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>All Maps</h1>
  </section>
  `);

  window.$mapsDisplay = $mapsDisplay;

  const renderAllMaps = (mapsData, favsData = []) => {
    mapsData.map((map) => {
      // console.log("map", map);
      const $mapArticle = $(
        `<article data-id=${map.id} class="user-map"></article>`
      );
      const $mapData = $(`
      <div class="map-item">
        <i class="fas fa-map-marked-alt"></i>
        <div class="map-info">
          <h3 class="title">${map.title}</h3>
          <span>|</span>
          <p class="description">${map.description}</p>
        </div>
        ${favsData
          .map((fav) => {
            if (fav.map_id === map.id) {
              return `<i data-favid=${fav.map_id} class="fas fa-heart favourited-map"></i>`;
            }
          })
          .join("")}
      </div>
    `);

      $mapArticle.append($mapData);

      $mapsDisplay.append($mapArticle);

      $mapArticle.on("click", (event) => {
        const mapId = $(event.target).parent(".user-map").attr("data-id");
        const favId = $(event.target)
          .find(".favourited-map")
          .attr("data-favid");

        console.log({ favId });
        views_manager.show("showMap", { mapId });
      });
    });
  };

  getUserMaps().then((json) => {
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    renderAllMaps(userMaps, userFavs);
  });
});
