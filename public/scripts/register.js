// Register new user form
$(() => {
  const $registerForm = $(`
  <form id="register-form" class="register-form">
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
    </form>
  `);

  window.$registerForm = $registerForm;

  $registerForm.on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();

    //////
    // make signUp
    // make getMyDetails
    signUp(data)
      .then(getMyDetails)
      .then((json) => {
        header.update(json.user);
        views_manager.show("my-maps");
      });
  });
});
