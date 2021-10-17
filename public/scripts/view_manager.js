$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $logInForm.detach();
    $registerForm.detach();

    switch (item) {
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case "signUp":
        $registerForm.appendTo($main);
        break;
      case 'mapsDisplay':
        $mapsDisplay.appendTo($main);
    }
  };
});
