/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // create a new map in database and adding contributors if there is one.
  router.post('/new', (req, res) => {
    const user = req.body;
    const {title, description, owner_id} = user;
    return db.query(`
      INSERT INTO maps (title, description, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, description, owner_id])
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({user: result.rows[0]});
      })
      .catch((err) => err.message);
    });
    return router;
}
