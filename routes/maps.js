/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // deleting a marker not finished
  router.post("/deleteMarker", (req, res) => {
    const id = req.body;
    return db
      .query(
        `
    DELETE FROM points WHERE id=$1;
      VALUES ($1)`,
        [id]
      )
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ user: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  // create a new map in database and adding contributors if there is one.
  router.post("/new", (req, res) => {
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
    console.log("id from cookies", userID);

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

  return router;
};
