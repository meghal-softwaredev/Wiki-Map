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
  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;
    console.log('user', user);
    user.password = bcrypt.hashSync(user.password, 12);
    const {name, email, password} = user;
    console.log("inside add User")
    return db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name,email, password])
      .then((result) => {
        console.log(result.rows[0]);
        result.rows[0]})
      .catch((err) => err.message);
    });
    return router;
};
