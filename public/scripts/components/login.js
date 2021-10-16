// Client facing scripts here
$(() => {
  const $logInForm = $(`
  <section id="login-container">
    <div class="img">
      <img src='../../assets/map.png' alt='image' height=400px width=400px>
    </div>
    <div class="login-form">
      <h1>Login</h1>
      <form method="POST" action="/login">
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
  </div>
  `);
  window.$logInForm = $logInForm;
});

{
  /* <div class="container login-container">
<div class="img">
  <img src='../../assets/map.png' alt='image' height=400px width=400px>
</div>
<div class="login">
<h1 class="ml-3">Login</h1>
<form method="POST" action="/login">
  <div class="form-group ml-3">
    <label for="email">Email address</label>
      <input type="email" class="form-control" style="width:300px;" id="email" name="email" placeholder="Enter email">
  </div>
  <div class="form-group ml-3">
    <label for="password">Password</label>
      <input type="password" class="form-control" style="width:300px;" id="password" name="password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary ml-3">Login</button>
</form>
</div>
</div> */
}
