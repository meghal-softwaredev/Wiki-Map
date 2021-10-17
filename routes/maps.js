/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
<<<<<<< HEAD
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
=======
  // create a new map in database and adding contributors if there is one.
  router.post('/new', (req, res) => {
    const user = req.body;
    const {title, description, owner_id} = user;
    return db.query(`
      INSERT INTO maps (title, description, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, description, owner_id])
>>>>>>> 22f43c96211277e3e10d666fa6d803db38988938
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ user: result.rows[0] });
      })
      .catch((err) => err.message);
<<<<<<< HEAD
  });

  router.get("/all", (req, res) => {
    const userID = req.session.userId;
    console.log("id from cookies", userID);
    if (!userID) {
      return db
        .query(`SELECT * FROM maps`)
        .then((result) => {
          console.log("get users maps", result.rows);
          return res.json({ userMaps: result.rows });
        })
        .catch((err) => err.message);
    }

    return (
      db
        ///////////// add params back in after done testing $1 [userID]
        .query(
          `SELECT * FROM maps LEFT OUTER JOIN favourites ON map_id = maps.id WHERE maps.owner_id = 2`
        )
        .then((result) => {
          console.log("get users maps", result.rows);
          return res.json({ userMaps: result.rows });
        })
        .catch((err) => err.message)
    );
  });

  return router;
};
=======
    });
    return router;
}
>>>>>>> 22f43c96211277e3e10d666fa6d803db38988938
