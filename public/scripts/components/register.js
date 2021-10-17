// Register new user form
$(() => {
  const $registerForm = $(`
  <form id="register-form" class="register-form" method="POST" action="/api/users/register">
      <p>Register</p>

      <div class="register-form__field-wrapper">
        <input type="name" name="name" placeholder="Name">
      </div>
      <div class="register-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="register-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>
      <div class="sign-up-form__field-wrapper">
          <button type="submit">Sign Up</button>
      </div>
    </form>
  `);

  window.$registerForm = $registerForm;

  $('#register-form').on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    signUp(data)
    .then(json => {
      console.log(json.user);
     // header.update(json.user);
      views_manager.show('mapsDisplay');
    });
  });
});

