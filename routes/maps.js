/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // create a new map
  router.post('/new', (req, res) => {
    console.log(req.body)
    const user = req.body;
    const {title, description, emailContributors} = user;
    return db.query(`
      INSERT INTO maps (title, description)
      VALUES ($1, $2)
      RETURNING *`,
      [title, description])
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({user: result.rows[0]});
      })
      .catch((err) => err.message);
    });
    return router;
  }
