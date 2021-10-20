/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/mpas,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // deleting a marker not finished
  router.post('/deleteMarker', (req, res) => {
    const id = req.body.id;
    return db.query(`
    DELETE FROM points WHERE id=$1
      RETURNING *`,
      [id])
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ user: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  // create a new map in database and adding contributors if there is one.
  router.post("/new", (req, res) => {
    const user = req.body;
    const userID = req.session.userId;
    const { title, description, emailContributors } = user;
    return db
      .query(
        `
      INSERT INTO maps (title, description, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
        [title, description, userID]
      )
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ map: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  // Show all maps
  router.get("/all", (req, res) => {
    const userID = req.session.userId;

    if (!userID) {
      return db
        .query(`SELECT * FROM maps`)
        .then((result) => {
          return res.json({ userMaps: result.rows });
        })
        .catch((err) => err.message);
    }

    const maps = db.query(`SELECT * FROM maps`);

    // const userFavourites = db.query(
    //   `SELECT * FROM favourites WHERE user_id = $1`,
    //   [userID]
    // );
    // TEST CODE
    const userFavourites = db.query(
      `SELECT * FROM favourites WHERE user_id = 1`
    );

    Promise.all([maps, userFavourites]).then((result) => {
      return res.json({
        userMaps: result[0].rows,

        // userFavs: result[1].rows,
        // TEST CODE
        userFavs: [
          { id: 1, user_id: 1, map_id: 2, favourite: true },
          { id: 1, user_id: 1, map_id: 1, favourite: true },
        ],
      });
    });
  });

  router.post("/marker/new", (req, res) => {
    const marker = req.body;
    const { title, description, imageURL, lat, lng, mapId } = marker;
    const userID = req.session.userId;
    return db
      .query(
        `
        INSERT INTO points (user_id, map_id, title, description, img_url, lat, lng)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [userID, mapId, title, description, imageURL, lat, lng]
      )
      .then((result) => {
        return res.json({ marker: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  return router;
};
