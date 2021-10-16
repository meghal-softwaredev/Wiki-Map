$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $registerForm.detach();

    switch (item) {
      case "my-maps":
        $registerForm.appendTo($main);
        break;
    }
  };
});
