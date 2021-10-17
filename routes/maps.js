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

    // questions:
    // how to pass userID?
    // how to make new query to with join on favourites, with no repeats

    // goal: show all maps, then,
    // show hearts/likes next to maps favourited by signed in user

    // const userMaps = {};
    const maps = db.query(`SELECT * FROM maps`);
    const userFavourites = db.query(
      `SELECT * FROM favourites WHERE user_id = 1`
    );
    Promise.all([maps, userFavourites]).then((result) => {
      console.log("result maps from promise:", result[0].rows);
      console.log("result favs from promise:", result[1].rows);
      // return res.json({ userMaps: result[0].rows, userFavs: result[1].rows });
      return res.json({
        userMaps: result[0].rows,
        userFavs: [
          { id: 1, user_id: 1, map_id: 2, favourite: true },
          { id: 1, user_id: 1, map_id: 1, favourite: true },
        ],
      });
    });

    //   .then((result) => {
    //     return res.json({ userMaps: result.rows });
    //   })
    //   .catch((err) => err.message);

    // .then(
    //   (result) => {
    //     return res.json({ userFavourites: result.rows });
    //   }
    // );
  });

  return router;
};
