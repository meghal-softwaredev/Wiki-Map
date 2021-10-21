$(() => {
  const $profile = $(`
    <section id="show-profile">
      <h2>User Profile</h2>
    <section>
  `);
  window.$profile = $profile;

  const renderUserProfile = (user, mapsData, userContributor) => {
    const $userProfileInfo = $(`
      <div>
        <label>User Name: </label>
        <p>${user.name}</p>
      </div>
      <div>
        <label>Email: </label>
        <p>${user.email}</p>
        </div>`);
    $profile.append($userProfileInfo);
    const $favourite = $(`
      <section id="show-favourite">
        <h2>Favourites</h2>
      <section>
    `);
    $profile.append($favourite);

    mapsData.forEach(map => {
      const $userFavouritesInfo = $(`
      <article class="user-map">
        <div class="map-item>
        <img src="" alt="" />
        <div class="map-info">
          <h3 class="title">${map.title}</h3>
          <p class="description">${map.description}</p>
        </div>
        <div class="like-button">
          <i class="fas fa-heart"></i>
        </div>
      </div>`);
      $profile.append($userFavouritesInfo);
    });
    const $contributors = $(`
      <br>
      <section id="show-contributors">
        <h2>Contributors</h2>
      <section>
    `);
    $profile.append($contributors);
    userContributor.forEach(map => {
      const $userContributorInfo = $(`
      <article class="user-map">
        <div class="map-item>
        <img src="" alt="" />
        <div class="map-info">
          <h3 class="title">${map.title}</h3>
          <p class="description">${map.description}</p>
        </div>
        <div class="like-button">
          <i class="fas fa-heart"></i>
        </div>
      </div>`);
      $profile.append($userContributorInfo);
    });
  }

  getUserProfile().then((json) => {
    const userProfile = json.userProfile;
    const userFavourites = json.userFavourites;
    const userContributor = json.userContributor;
    renderUserProfile(userProfile, userFavourites, userContributor);
  });
});
