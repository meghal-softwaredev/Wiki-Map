$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');

  const $userLinks = $(`
  <nav id="page-header__user-links" class="page-header__user-links">
    <ul>
      <li class="map">Logo</li>
      <li class="login_button">Log In</li>
      <li class="sign-up_button">Sign Up</li>
    </ul>
  </nav>
  `);
  $pageHeader.append($userLinks);
  //window.header.update = updateHeader;
  $("header").on('click', '.login_button', () => {
    views_manager.show('logIn');
  });
  $("header").on('click', '.sign-up_button', () => {
    views_manager.show('signUp');
  });

});
