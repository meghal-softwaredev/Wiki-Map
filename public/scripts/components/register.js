// Register new user form
$(() => {
  const $registerForm = $(`
  <section id="signup-container">
    <div class="img">
      <img src='../../assets/signup.png' alt='image' height=400px width=400px>
    </div>
    <div class="signup-form">
      <h1>Sign Up</h1>
      <form method="POST" action="/signup">
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
        <button type="submit" class="signup-button">Sign up</button>
      </form>
    </div>
  </section>
  `);

  window.$registerForm = $registerForm;

  // $registerForm.on("submit", function (e) {
  //   e.preventDefault();

  //   const data = $(this).serialize();

  //   signUp(data)
  //     .then(getMyDetails)
  //     .then((json) => {
  //       header.update(json.user);
  //       views_manager.show("my-maps");
  //     });
  // });
});
