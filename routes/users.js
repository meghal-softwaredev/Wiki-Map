/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = (db) => {
  // Get user info
  router.get("/info", (req, res) => {
    const userID = req.session.userId;
    console.log("user ID", userID);
    return db
      .query(
        `
      SELECT * FROM users where id = $1`,
        [userID]
      )
      .then((result) => {
        // console.log("server", result.rows[0]);
        return res.json({ user: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  // Create a new user
  router.post("/register", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, salt);
    const { name, email, password } = user;
    return db.query(`
      SELECT * FROM users WHERE email=$1
    `, [email])
      .then((account) => {
        if (account.rows[0]) {
          res.send(false);
        } else {
          return db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *`,
              [name, email, password]
            )
            .then((result) => {
              //set cookie
              req.session.userId = result.rows[0].id;
              return res.json({ user: result.rows[0] });
            })
            .catch((err) => err.message);
        }
      })
      .catch((err) => err.message);
  });

  //logout route
  router.post("/logout", (req, res) => {
    req.session = null;
    res.send({});
  });

  // Login existing user and set cookie
  const verifyLogin = (email, password) => {
    return (
      db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        // verify email
        .then((data) => {
          if (data.rows[0]) {
            const userPassword = data.rows[0].password;
            // verify password
            if (bcrypt.compareSync(password, userPassword)) {
              return {id: data.rows[0].id, name: data.rows[0].name, email: data.rows[0].email};
            }
          }
          return null;
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  };
  exports.verifyLogin = verifyLogin;

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    verifyLogin(email, password)
      .then((userInfo) => {
        if (!userInfo) {
          res.send(false);
        } else {
          req.session.userId = userInfo.id;
          res.send({ user: { name: userInfo.name, email: userInfo.email, id: userInfo.id } });
        }
      })
      .catch((err) => {res.send(err)});
  });
  return router;
};
