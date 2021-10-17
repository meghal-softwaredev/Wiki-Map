$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>All Maps</h1>
  </section>
  `);

  window.$mapsDisplay = $mapsDisplay;

  const renderAllMaps = (mapsData, favsData) => {
    console.log("mapsData:", mapsData);
    console.log("favsData:", favsData);

    // console.log("render all maps");
    // console.log("maps data from query:", mapsData);
    mapsData.map((map) => {
      $mapsDisplay.append(`
      <article class="user-map">
        <div class="map-item">
          <img src="" alt="" />
          <div class="map-info">
            <h3 class="title">${map.title}</h3>
            <p class="description">${map.description}</p>
            ${favsData.map((fav) => {
              console.log({ fav, map });
              if (fav.map_id === map.id) {
                return `<i class="fas fa-heart favourited-map"></i>`;
              }
            })}
          </div>
        </div>`);
    });
  };

  getUserMaps().then((json) => {
    console.log(json);
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    return renderAllMaps(userMaps, userFavs);
  });
  // .then((userMaps) => {
  //   console.log("the userMaps", userMaps);
  //   // console.log("the userID:", userID);

  //   // if (!user) render all maps
  //   renderAllMaps(userMaps);

  //   // if (user) render all maps PLUS likes
  // });
});
