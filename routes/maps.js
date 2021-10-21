/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/mpas,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // deleting a marker not finished
  router.post("/deleteMarker", (req, res) => {
    const id = req.body.id;
     db.query(`
    DELETE FROM points WHERE id=$1
      RETURNING *`
      , [id])
      .catch((err) => err.message);
  });

  // create a new map in database
  router.post("/new", (req, res) => {
    const user = req.body;
    const userID = req.session.userId;
    const { title, description } = user;
    return db
      .query(
        `
      INSERT INTO maps (title, description, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
        [title, description, userID]
      )
      .then((result) => {
        console.log("result", result.rows[0]);
        return res.json({ map: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  // Show all maps
  router.get("/all", (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return db
        .query(`SELECT * FROM maps`)
        .then((result) => {
          return res.json({ userMaps: result.rows });
        })
        .catch((err) => err.message);
    }

    const maps = db.query(`SELECT * FROM maps`);

    const userFavourites = db.query(
      `SELECT * FROM favourites WHERE user_id = $1`,
      [userId]
    );
    console.log("---route---");

    Promise.all([maps, userFavourites]).then((result) => {
      return res.json({
        userMaps: result[0].rows,
        userFavs: result[1].rows,
      });
    });
  });

  router.post("/marker/new", (req, res) => {
    const marker = req.body;
    const { mapId, title, description, imageURL, icon, lat, lng } = marker;
    console.log("imageURl", imageURL, "icon", icon);
    let iconURL = "";
    if (icon === "beach") {
      iconURL =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    } else if (icon === "park") {
      iconURL = "assets/park.png";
    } else if (icon === "restaurant") {
      iconURL = "assets/restaurant.jpeg";
    } else if (icon === "movie") {
      iconURL = "assets/movie.jpeg";
    }

    const userID = req.session.userId;
    return db
      .query(
        `
        INSERT INTO points (user_id, map_id, title, description, img_url, icon_url, lat, lng)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [userID, mapId, title, description, imageURL, iconURL, lat, lng]
      )
      .then((result) => {
        console.log(result.rows[0]);
        return res.json({ marker: result.rows[0] });
      })
      .catch((err) => err.message);
  });

  router.post("/marker/edit", (req, res) => {
    const update = {};
    const id = req.body.data.id;
    let info = req.body.data.update;
    info = decodeURI(info);
    info = info.split("&");
    info.forEach((main) => {
      main = main.split("=");
      update[main[0]] = main[1];
    });
    const { title, image, description } = update;
    return db
      .query(
        `
      UPDATE points
      SET title = $2, description = $3, img_url = $4
      WHERE id = $1`,
        [id, title, description, image]
      )
      .then(() => {
        return "get me out";
      })
      .catch((err) => err.message);
  });

  // delete like
  router.post("/like/delete", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.body.mapId;
    return db
      .query(`DELETE FROM favourites WHERE map_id = $1 AND user_id = $2`, [
        mapId,
        userId,
      ])
      .catch((err) => {
        console.log("finito miriano");
        return err.message;
      });
  });

  // add like
  router.post("/like/add", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.body.mapId;
    return db
      .query(`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2)`, [
        userId,
        mapId,
      ])
      .catch((err) => err.message);
  });

  // All map data for id (points, favourites, maps)
  router.get("/all/id", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.query.mapId;

    const map = db.query(`SELECT * FROM maps WHERE id = $1`, [mapId]);
    const points = db.query(`SELECT * FROM points WHERE map_id = $1`, [mapId]);
    const favourite = db.query(
      `SELECT * FROM favourites WHERE user_id = $1 AND map_id = $2`,
      [userId, mapId]
    );

    console.log("Points:", points);

    // if not logged in, only show map and points data
    if (!userId) {
      Promise.all([map, points]).then((result) => {
        return res.json({
          map: result[0].rows[0],
          mapPoints: result[1].rows,
          mapFavourite: { id: "not logged in" },
        });
      });
    }

    Promise.all([map, points, favourite]).then((result) => {
      return res.json({
        map: result[0].rows[0],
        mapPoints: result[1].rows,
        mapFavourite: result[2].rows[0] || {},
      });
    });
  });

  router.get("/userProfile", (req, res) => {
    const userId = req.session.userId;

    const users = db.query(`SELECT * FROM users where id = $1`, [userId]);
    const userFavourites = db.query(
      `SELECT title, description FROM users JOIN maps
      ON users.id = owner_id JOIN favourites
      ON map_id = maps.id
      WHERE users.id = $1`,
      [userId]
    );

    const userContributors = db.query(
      `SELECT title, description FROM users JOIN maps
      ON users.id = owner_id JOIN contributors
      ON  map_id = maps.id
      WHERE users.id = $1`,
      [userId]
    );

    Promise.all([users, userFavourites, userContributors]).then((result) => {
      console.log(result[0].rows);
      console.log(result[1].rows);
      console.log(result[2].rows);
      return res.json({
        userProfile: result[0].rows[0],
        userFavourites: result[1].rows,
        userContributor: result[2].rows,
      });
    });
  });

  return router;
};
