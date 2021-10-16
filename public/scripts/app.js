// Client facing scripts here
$(() => {
  const $main = $('#main-content');
  const $logInForm = $(`
  <form id="login-form" class="login-form">
      <p>Login</p>
      <div class="login-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="login-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>

      <div class="login-form__field-wrapper">
          <button>Login</button>
          <a id="login-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);
  $logInForm.appendTo($main);
});
