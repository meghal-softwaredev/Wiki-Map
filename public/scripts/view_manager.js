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
        mapFinal(options.mapId).then((result) => {
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
