let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

const initializeDBHelpers = (db) => {
  //exports.dbParams = dbParams;
  /**
   * Add a new user to the database.
   * @param {{name: string, password: string, email: string}} user
   * @return {Promise<{}>} A promise to the user.
   */
  const addUser = function (user) {
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
  };
  return { addUser };
};

module.exports = { dbParams, initializeDBHelpers };
