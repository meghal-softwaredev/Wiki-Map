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

  // to go in network.js
  getMyDetails = () => {
    console.log("getMyDetails");
    return $.ajax({
      url: "/users/me",
    });
  };

  signUp = (data) => {
    return $.ajax({
      method: "POST",
      url: "/users",
      data,
    });
  };

  $registerForm.on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();

    signUp(data)
      .then(getMyDetails)
      .then((json) => {
        header.update(json.user);
        views_manager.show("my-maps");
      });
  });
});
