$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $logInForm.detach();
    $registerForm.detach();
    $map.detach();

    switch (item) {
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case "signUp":
        $registerForm.appendTo($main);
        break;
      case 'mapsDisplay':
        $mapsDisplay.appendTo($main);
        break;
      case 'showMap':
        $map.appendTo($main);
        break;
    }
  };
});
