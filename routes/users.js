/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  // Create a new user
  router.post("/register", (req, res) => {
    const user = req.body;
    console.log("user", user);
    user.password = bcrypt.hashSync(user.password, 12);
    const { name, email, password } = user;
    console.log("inside add User");
    return db
      .query(
        `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`,
        [name, email, password]
      )
      .then((result) => {
        console.log(result.rows[0]);
        result.rows[0];
      })
      .catch((err) => err.message);
  });

  // Login user if valid
  // 1 (helper)
  // returns * of a user
  const getUserWithEmail = (email) => {
    return db
      .query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((result) => {
        if (result.rows.length) {
          return result.rows[0];
        }
        return null;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // 2 (helper)
  // using * of user, check password matches
  const verifyPassword = (email, password) => {
    return db.getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };

  // 3 (post request) /api/isers/login
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
  });

  // const login = (email, password) => {
  //   return db.getUserWithEmail(email).then((user) => {
  //     if (bcrypt.compareSync(password, user.password)) {
  //       return user;
  //     }
  //     return null;
  //   });
  // };
  // exports.login = login;

  // router.post("/login", (req, res) => {
  //   const { email, password } = req.body;
  //   login(email, password)
  //     .then((user) => {
  //       if (!user) {
  //         res.send({ error: "error" });
  //         return;
  //       }
  //       req.session.userId = user.id;
  //       res.send({ user: { name: user.name, email: user.email, id: user.id } });
  //     })
  //     .catch((e) => res.send(e));
  // });

  return router;
};
