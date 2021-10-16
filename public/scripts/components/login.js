// Client facing scripts here
$(() => {
  const $logInForm = $(`
  <section id="login-container">
    <div class="img">
      <img src='../../assets/map.png' alt='image' height=400px width=400px>
    </div>
    <div class="login-form">
      <h1>Login</h1>
      <form id="login-form" method="POST" action="api/users/login">
        <div class="form-group">
          <label for="email">Email address</label>
            <input type="email" class="form-control" style="width:300px;" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
            <input type="password" class="form-control" style="width:300px;" id="password" name="password" placeholder="Password">
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </section>
  `);
  window.$logInForm = $logInForm;

  $("#login-form").on("submit", function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    logIn(data).then((json) => {
      console.log(json);
      if (!json.user) {
        views_manager.show("error", "Failed to login");
        return;
      }
      console.log(json.user);
      header.update(json.user);
      views_manager.show("mapsDisplay");
    });
  });
});
