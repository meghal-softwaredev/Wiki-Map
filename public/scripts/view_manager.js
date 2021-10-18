$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $logInForm.detach();
    $registerPage.detach();
    $map.detach();
    $mapsDisplay.detach();
    // if ($profile) {
    //   $profile.detach();
    // }

    switch (item) {
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case "signUp":
        $registerPage.appendTo($main);
        break;
      case 'mapsDisplay':
        $mapsDisplay.appendTo($main);
        break;
      case 'showMap':
        $map.appendTo($main);
        break;
      // case 'profile':
      //   $profile.appendTo($main);
      //   break;
    }
  };
});
