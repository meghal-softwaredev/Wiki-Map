$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>All Maps</h1>
  </section>
  `);

  window.$mapsDisplay = $mapsDisplay;

  const renderAllMaps = (mapsData, favsData = []) => {
    mapsData.map((map) => {
      $mapsDisplay.append(`
      <article class="user-map">
        <div class="map-item">
          <img src="" alt="" />
          <div class="map-info">
            <h3 class="title">${map.title}</h3>
            <p class="description">${map.description}</p>
             ${favsData.map((fav) => {
               if (fav.map_id === map.id) {
                 return `<i class="fas fa-heart favourited-map"></i>`;
               }
             })}
          </div>
        </div>`);
    });
  };

  // ${
  //   favsData.find((fav) => fav.map_id === map.id)
  //     ? `<i class="fas fa-heart favourited-map"></i>`
  //     : `<i class="fas fa-heart"></i>`
  // }

  // ${
  //   !userID
  //     ? ""
  //     : favsData.find((fav) => fav.map_id === map.id)
  //     ? `<i class="fas fa-heart favourited-map"></i>`
  //     : `<i class="fas fa-heart"></i>`
  // }
  // ${favsData.map((fav) => {
  //   if (fav.map_id === map.id) {
  //     return `<i class="fas fa-heart favourited-map"></i>`;
  //   }
  // })}

  getUserMaps().then((json) => {
    console.log(json);
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    return renderAllMaps(userMaps, userFavs);
  });
});
