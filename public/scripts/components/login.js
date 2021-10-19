// Client facing scripts here
$(() => {
  const $loginPage = $(`<section id="login-container">`);
  const $imageContainer = $(`<div class="img">`);
  const $img =
    $(`<img src='../../assets/map.png' alt='user icon' height=400px width=400px>
  `);
  $imageContainer.append($img);

  const $formContainer = $(`<div class="login-form">`);
  const $header = $(`<h1>Login</h1>`);

  const $loginForm = $(`
      <form id="login-form">
        <div id="error"></div>
        <div class="form-group">
          <label for="email">Email address</label>
            <input required type="email" class="form-control" style="width:300px;" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
            <input required type="password" class="form-control" style="width:300px;" id="password" name="password" placeholder="Password">
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
  `);
  $formContainer.append($header, $loginForm);
  $loginPage.append($imageContainer, $formContainer);

  window.$loginPage = $loginPage;

  $loginForm.on("submit", function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    logIn(data)
    .then((json) => {
      if (!json) {
        $("#error").slideDown("slow", () => {
          $('#error').empty();
          $('#error').append("Bad credentials.");
        });
      } else {
        header.update(json.user);
        views_manager.show("mapsDisplay");
      }
    })
    .catch((error) => {
      console.log(error)
    });
  });
});
