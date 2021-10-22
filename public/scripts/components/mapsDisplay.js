const $mapsDisplay = $(`
<section id="maps-display">
</section>
`);

window.$mapsDisplay = $mapsDisplay;

$mapsDisplay.on("click", (event) => {
  const mapId = $(event.target).parent(".user-map").attr("data-id");
  if (mapId) {
    views_manager.show("showMap", { mapId });
  }
});

function renderMapList (mapsData, favsData) {
  if (!mapsData) {
    return $('<h2>There is no map!</h2>');
  } else {
    let favsIds;
    if (favsData) {
      favsIds = favsData.map(fav => fav.map_id);
    } else {
      favsIds = ['a']
    }
    return mapsData.map((aMap) => {
      return $(`
      <article data-id=${aMap.id} class="user-map">
      <div class="map-item">
      <i class="fas fa-map-marked-alt"></i>
      <div class="map-info">
      <h3 class="title">${aMap.title}</h3>
      <span>|</span>
      <p class="description">${aMap.description}</p>
      </div>
      ${favsIds.includes(aMap.id) ? '<i data-favid="' + aMap.id + '" class="fas fa-heart favourited-map"></i>' : ""}
      </div>
      </article>
      `);
    });
  }
}
function createList () {
  return getUserMaps()
  .then((json) => {
    const userMaps = json.userMaps;
    const userFavs = json.userFavs;
    return Promise.resolve($mapsDisplay.append(renderMapList(userMaps, userFavs)))
  });
}
