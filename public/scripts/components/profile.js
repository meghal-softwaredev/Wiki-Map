$(() => {
  const $profile = $(`
  <section id="show-profile">
    <h2>User Profile</h2>
  <section>
  `);
  window.$profile = $profile;
  const userProfile = (user) => {
    $profile.append(`
    <div>
      <label>User Name: </label>
      <p>${user.name}</p>
    </div>
    <div>
      <label>Email: </label>
      <p>${user.email}</p>
    </div>`);
  }
  // $profile.append(`
  // <br>
  // <section id="show-favourites">
  //   <h2>Favourites</h2>
  // <section>
  // `);
  // const userMaps = (mapData) => {
  //   mapsData.forEach(map => {
  //     $profile.append(`
  //     <article class="user-map">
  //       <div class="map-item>
  //       <img src="" alt="" />
  //       <div class="map-info">
  //         <h3 class="title">${map.title}</h3>
  //         <p class="description">${map.description}</p>
  //       </div>
  //       <div class="like-button">
  //         <i class="fas fa-heart"></i>
  //       </div>
  //     </div>`);
  //   });
  // }
  // $profile.append(`
  // <br>
  // <section id="show-contributors">
  //   <h2>Contributors</h2>
  // <section>
  // `);

  getUser()
  .then(json => {
    userProfile(json.user);
  });

  // getFavouriteMaps()
  // .then(json => {
  //   userMaps(json.user);
  // });

  // getContributedMaps()
  // .then(json => {
  //   userMaps(json.user);
  // });
});
