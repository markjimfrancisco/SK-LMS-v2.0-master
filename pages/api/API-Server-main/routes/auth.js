var Database = require("../Database/Database");
var Utilities = require("../utilities.js");
var {Refresh, Authenticate} = require('../middleware/Auth');

var jwt = require('jsonwebtoken');

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
    app.post("/auth/refresh", Refresh, async (req, res) => {
        const {tokenData, token, refreshToken} = req;

        res.cookie('token', token, {httpOnly: true})
        res.cookie('refreshToken', refreshToken, {httpOnly: true})
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.json(Utilities.CreateResponse(tokenData ? true : false, null));
      });
    
    app.post("/auth/validate", Authenticate, async (req, res) => {
        res.json(Utilities.CreateResponse(req.validToken, null))
    })
}