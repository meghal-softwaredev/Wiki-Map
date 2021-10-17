$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>All Maps</h1>
  </section>
  `);

  window.$mapsDisplay = $mapsDisplay;

  // const showMapAtId = (id) => {
  //   console.log("clicked id:", id);
  //   views_manager.show("showMap");
  // };
  // <article id=${map.id} class="user-map" onClick=(${showMapAtId(map.id)})>

  const renderAllMaps = (mapsData, favsData = []) => {
    mapsData.map((map) => {
      $mapsDisplay.append(`
      <article id=${map.id} class="user-map">
        <div class="map-item">}
          <i class="fas fa-map-marked-alt"></i>
          <div class="map-info">
            <h3 class="title">${map.title}</h3>
            <span>|</span>
            <p class="description">${map.description}</p>
          </div>
             ${favsData
               .map((fav) => {
                 if (fav.map_id === map.id) {
                   return `<i class="fas fa-heart favourited-map"></i>`;
                 }
               })
               .join("")}
        </div>
      </article>`);
    });
  };

  // ${
  //   favsData.find((fav) => fav.map_id === map.id)
  //     ? `<i class="fas fa-heart favourited-map"></i>`
  //     : `<i class="fas fa-heart"></i>`
  // }

  getUserMaps().then((json) => {
    console.log(json);
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    return renderAllMaps(userMaps, userFavs);
  });
});
