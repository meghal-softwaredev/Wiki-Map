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
  <section id="signup-container">
    <div class="img">
      <img src='../../assets/signup.png' alt='image' height=400px width=400px>
    </div>
    <div class="signup-form">
      <h1>Sign Up</h1>
      <form id='register-form' method="POST" action="/api/users/register">
        <div class="form-group">
          <label for="name">Name</label>
            <input type="name" class="form-control" style="width:300px;" id="name" name="name" placeholder="Enter name">
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
            <input type="email" class="form-control" style="width:300px;" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
            <input type="password" class="form-control" style="width:300px;" id="password" name="password" placeholder="Password">
        </div>
        <button class="signup-button">Sign up</button>
      </form>
  `);
  $formContainer.append($header, $registerForm);
  $registerPage.append($imageContainer, $formContainer);

  window.$registerPage = $registerPage;

  $("#register-form").on("submit", function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    signUp(data).then((json) => {
      console.log(json.user);
      // header.update(json.user);
      views_manager.show("mapsDisplay");
    });
  });
});
