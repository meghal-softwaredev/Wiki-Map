$(() => {
  window.header = {};

  const $pageHeader = $("#page-header");

  const $userLinks = $(`
  <nav id="navbar">
    <div class="nav-logo">Wiki Maps</div>
    <ul class="nav-links">
      <li class="login_button">Login</li>
      <li class="sign-up_button">Sign Up</li>
    </ul>
  </nav>
  `);
  $pageHeader.append($userLinks);
  //window.header.update = updateHeader;
  $("header").on('click', '.login_button', () => {
    views_manager.show('logIn');
  });
  $("header").on("click", ".sign-up_button", () => {
    views_manager.show("signUp");
  });
});
