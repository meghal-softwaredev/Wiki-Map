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

  router.get("/id", (req, res) => {
    const userID = req.session.userId;
    console.log("id from cookies", userID);
    if (!userID) {
      // not a user
      return (
        db
          ///////////// add params back in after done testing $1 [userID]
          .query(`SELECT * FROM maps`)
          .then((result) => {
            console.log("get users maps", result.rows);
            return res.json({ userMaps: result.rows });
          })
          .catch((err) => err.message)
      );
    }

    // return (
    //   db
    //     ///////////// add params back in after done testing $1 [userID]
    //     .query(
    //       `SELECT * FROM maps LEFT OUTER JOIN favourites ON map_id = maps.id WHERE maps.owner_id = 2`
    //     )
    //     .then((result) => {
    //       console.log("get users maps", result.rows);
    //       return res.json({ userMaps: result.rows });
    //     })
    //     .catch((err) => err.message)
    // );
  });

  return router;
};
