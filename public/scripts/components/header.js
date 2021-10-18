$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find(".page-header__user-links").remove();
    let $userLinks;
    if (!user) {
    $userLinks = $(`
      <nav id="navbar" class="page-header__user-links">
        <div class="nav-logo">Wiki Maps</div>
        <ul class="nav-links">
          <li class="login_button">Login</li>
          <li class="sign-up_button">Sign Up</li>
        </ul>
      </nav>
    `);
    }
    else {
    $userLinks = $(`
      <nav id="navbar" class="page-header__user-links">
        <div class="nav-logo">Wiki Maps</div>
        <ul class="nav-links">
        <li class="new-map">Create New Map</li>
          <li class="profile">${user.email}</li>
          <li class="logout">Logout</li>
        </ul>
      </nav>
      `);
    }
    $pageHeader.append($userLinks);
    }
    window.header.update = updateHeader;

    getUser()
      .then(function( json ) {
      updateHeader(json.user);
    });

  $("header").on('click', '.nav-logo', () => {
    views_manager.show('mapsDisplay');
  });
  $("header").on('click', '.login_button', () => {
    views_manager.show('logIn');
  });
  $("header").on("click", ".sign-up_button", () => {
    views_manager.show("signUp");
  });
  $("header").on("click", ".new-map", () => {
    views_manager.show("showMap");
  });
  $("header").on("click", ".profile", () => {
    views_manager.show("profile");
  });
  $("header").on("click", ".logout", () => {
    logOut().then(() => {
      updateHeader(null);
    });
  });
});
