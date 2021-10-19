/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // create a new map
  router.post("/new", (req, res) => {
    console.log(req.body);
    const user = req.body;
    const { title, description, emailContributors } = user;
    return db
      .query(
        `
      INSERT INTO maps (title, description)
      VALUES ($1, $2)
      RETURNING *`,
        [title, description]
      )
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ user: result.rows[0] });
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
        userFavs: result[1].rows,
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
    const mapID = 1;
    const { title, description, imageURL } = marker;
    const userID = req.session.userId;
    return db
      .query(
        `
        INSERT INTO points (user_id, map_id, title, description, img_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [userID, mapID, title, description, imageURL]
      )
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ marker: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  return router;
};
