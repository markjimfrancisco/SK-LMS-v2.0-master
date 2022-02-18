var Database = require("../Database/Database");
var Utilities = require("../utilities.js");

Database.execute = function (callback) {
  const database = new Database();
  return callback(database).then(
    (result) => database.close().then(() => result),
    (err) =>
      database.close().then(() => {
        throw err;
      })
  );
};

module.exports = function (app) {
  app.get("/grade-levels", async (req, res) => {
    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_gradelevels`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.json(result);
  });
};
