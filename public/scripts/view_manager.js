$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $loginPage.detach();
    $registerPage.detach();
    $map.detach();
    $mapsDisplay.detach();
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
        $map.appendTo($main);
        break;
      case 'profile':
        $profile.appendTo($main);
        break;
      case 'createNewMap':
        $createNewMap.appendTo($main);
        break;
    }
  };
});
