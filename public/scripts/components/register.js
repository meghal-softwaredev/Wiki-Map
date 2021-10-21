// Register new user form
$(() => {
  const $registerPage = $(`<section id="signup-container">`);
  const $imageContainer = $(`<div class="img">`);
  const $image = $(
    `<img src='../../assets/signup.png' alt='image' height=400px width=400px>`
  );
  $imageContainer.append($image);

  const $formContainer = $(`<div class="signup-form">`);
  const $header = $(`<h1>Sign Up</h1>`);

  const $registerForm = $(`
      <form id='register-form'>
      <div id="error"></div>
        <div class="form-group">
          <label for="name">Name</label>
            <input required type="name" class="form-control" id="name" name="name" placeholder="Enter name">
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
            <input required type="email" class="form-control" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
            <input required type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
        <button class="signup-button">Sign up</button>
      </form>
  `);
  $formContainer.append($header, $registerForm);
  $registerPage.append($imageContainer, $formContainer);

  window.$registerPage = $registerPage;

  $registerForm.on("submit", function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    signUp(data).then((account) => {
      if (!account) {
        $("#error").slideDown("slow", () => {
          $("#error").empty();
          $("#error").append("An account at this email already exist.");
        });
      } else {
        header.update(account.user);
        views_manager.show("mapsDisplay");
      }
    });
  });
});
