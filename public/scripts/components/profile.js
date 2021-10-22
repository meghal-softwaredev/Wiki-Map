  const $profile = $(`
    <section id="show-profile">
      <div class="category">
        <i class="fas fa-user-circle"></i>
        <h2>User Profile</h2>
      </div>
    <section>
  `);
  window.$profile = $profile;

  const renderUserProfile = (user, mapsData, userContributor) => {
    const $userProfileInfo = $(`
      <div class="info">
        <h4>User Name: </h4>
        <p>${user.name}</p>
      </div>
      <div class="info">
        <h4>Email: </h4>
        <p>${user.email}</p>
      </div>`);

    $profile.append($userProfileInfo);

    const $favourite = $(`
      <section id="show-favourite">
        <div class="category">
          <i class="fas fa-heart"></i>
          <h2>Favourites</h2>
        </div>
      <section>
    `);

    $profile.append($favourite);

    mapsData.forEach((map) => {
      const $userFavouritesInfo = $(`
      <article class="user-list">
        <div class="map-list">
          <h4 class="title">${map.title}</h4>
          <p class="description">${map.description}</p>
        </div>
      </article>`);
      $profile.append($userFavouritesInfo);
    });
    const $contributors = $(`
      <section id="show-contributors">
        <div class="category">
          <i class="fas fa-users"></i>
          <h2>Contributions</h2>
        </div>
      <section>
    `);
    $profile.append($contributors);
    userContributor.forEach((map) => {
      const $userContributorInfo = $(`
      <article class="user-list">
        <div class="map-item>
        <img src="" alt="" />
        <div class="map-list">
          <h4 class="title">${map.title}</h4>
          <p class="description">${map.description}</p>
        </div>
      </div>`);
      $profile.append($userContributorInfo);
    });
  };

  function renderProfile () {
    return getUserProfile()
    .then((json) => {
      const userProfile = json.userProfile;
      const userFavourites = json.userFavourites;
      const userContributor = json.userContributor;
      return Promise.resolve($profile.append(renderUserProfile(userProfile, userFavourites, userContributor)));
    });
  }
