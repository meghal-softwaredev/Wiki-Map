$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item, options) {
    $loginPage.detach();
    $registerPage.detach();
    $mapWrapper.detach();
    $mapsDisplay.detach();
    $createNewMap.detach();
    $profile.detach();
    $createNewMap.detach();

    switch (item) {
      case "logIn":
        $loginPage.appendTo($main);
        break;
      case "signUp":
        $registerPage.appendTo($main);
        break;
      case "mapsDisplay":
        $mapsDisplay.appendTo($main);
        break;
      case "showMap":
        $mapWrapper.empty();
        // const $map = makeMap(options.mapId);
        console.log("options.mapId:", options.mapId);
        mapFinal(options.mapId).then((result) => {
          console.log("mapId inside view_show:", options.mapId);
          result.appendTo($mapWrapper);
          $mapWrapper.appendTo($main);
        });
        break;
      case "profile":
        $profile.appendTo($main);
        break;
      case "createNewMap":
        $createNewMap.appendTo($main);
        break;
    }
  };
});
