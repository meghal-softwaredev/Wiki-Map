$(() => {
  window.header = {};

  const $pageHeader = $("#page-header");

  const $userLinks = $(`
  <nav id="navbar">
    <div class="nav-logo">Wiki Maps</div>
    <ul class="nav-links">
      <li class="login_button">Log In</li>
      <li class="sign-up_button">Sign Up</li>
    </ul>
  </nav>
  `);
  $pageHeader.append($userLinks);

  $("header").on("click", ".login_button", () => {
    console.log("clicked login");
    views_manager.show("logIn");
  });
  $("header").on("click", ".sign-up_button", () => {
    console.log("clicked sign up");

    views_manager.show("signUp");
  });
});

// <nav id="page-header__user-links" class="page-header__user-links">
//   <ul>
//     <li class="map">Logo</li>
//     <li class="login_button">Log In</li>
//     <li class="sign-up_button">Sign Up</li>
//   </ul>
// </nav>;
