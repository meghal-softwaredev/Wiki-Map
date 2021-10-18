/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  // Get user info
  router.get('/info', (req, res) => {
    const userID = req.session.userId;
    return db.query(`
      SELECT * FROM users where id = $1`, [userID])
        .then((result) => {
          console.log("server", result.rows[0]);
        return res.json({user: result.rows[0]});
      })
      .catch((err) => err.message);
    })

  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    const {name, email, password} = user;
    return db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name,email, password])
      .then((result) => {
        //set cookie
        req.session.userId = result.rows[0].id;
        return res.json({user: result.rows[0]});
      })
      .catch((err) => err.message);
    });
    //logout route
    router.post("/logout", (req, res) => {
      req.session = null;
      res.redirect('/login');
    });
    return router;
};
