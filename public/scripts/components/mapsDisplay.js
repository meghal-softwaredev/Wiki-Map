$(() => {
  const $mapsDisplay = $(`
  <section id="maps-display">
    <h1>All Maps</h1>
  </section>
  `);

  window.$mapsDisplay = $mapsDisplay;

  const renderAllMaps = (mapsData, favsData = []) => {
    mapsData.map((map) => {
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
              return `<i class="fas fa-heart favourited-map"></i>`;
            }
          })
          .join("")}
      </div>
    `);

      $mapArticle.append($mapData);

      $mapsDisplay.append($mapArticle);

      $mapArticle.on("click", (event) => {
        const mapId = $(event.target).parent(".user-map").attr("data-id");
        views_manager.show("showMap", { mapId });
      });

      // $mapsDisplay.append(`
      // <article data-id=${map.id} class="user-map">
      //   <div class="map-item">
      //     <i class="fas fa-map-marked-alt"></i>
      //     <div class="map-info">
      //       <h3 class="title">${map.title}</h3>
      //       <span>|</span>
      //       <p class="description">${map.description}</p>
      //     </div>
      //     ${favsData
      //       .map((fav) => {
      //         if (fav.map_id === map.id) {
      //           return `<i class="fas fa-heart favourited-map"></i>`;
      //         }
      //       })
      //       .join("")}
      //   </div>
      // </article>`);
    });
  };

  getUserMaps().then((json) => {
    console.log("fetching json:", json);
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    // return renderAllMaps(userMaps, userFavs);
    renderAllMaps(userMaps, userFavs);
  });

  // ${favsData
  //   .map((fav) => {
  //     if (fav.map_id === map.id) {
  //       return `<i class="fas fa-heart favourited-map"></i>`;
  //     }
  //   })
  //   .join("")}

  // ${
  //   favsData.find((fav) => fav.map_id === map.id)
  //     ? `<i class="fas fa-heart favourited-map"></i>`
  //     : `<i class="fas fa-heart"></i>`
  // }

  // <i class="fas fa-heart  ${
  //   favsData.filter((fav) => fav.map_id === map.id).length
  //     ? "favourited-map"
  //     : ""
  // }"></i>
});
