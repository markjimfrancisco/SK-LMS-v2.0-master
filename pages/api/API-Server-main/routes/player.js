var Database = require("../Database/Database");
const { Authenticate } = require("../middleware/Auth");
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
  app.post("/player/level", Authenticate, async (req, res) => {
    const { userid } = req.body.data;

    let result = await Database.Execute((database) =>
      database
        .query("SELECT level FROM sk_users WHERE id = ?", [userid])
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(
      Utilities.CreateResponse(
        req.validToken,
        req.validToken ? result : "Invalid token"
      )
    );
  });

  app.post("/player/experience", Authenticate, async (req, res) => {
    const { userid } = req.body.data;

    let result = await Database.Execute((database) =>
      database
        .query(`SELECT experience FROM sk_users WHERE id = ${userid}`)
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    if (req.validToken)
      res.json(
        Utilities.CreateResponse(
          result ? true : false,
          result ? result : { experience: 0 }
        )
      );
    else res.json(Utilities.CreateResponse(false, "Invalid token"));
  });

  app.post("/player/experiences", Authenticate, async (req, res) => {
    const { userid } = req.body.data;

    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT subject, topic, experience FROM sk_players_experience WHERE userid = ${userid}`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(
      Utilities.CreateResponse(
        req.validToken,
        req.validToken ? result : "Invalid token"
      )
    );
  });

  app.post("/player/add/experience", Authenticate, async (req, res) => {
    const { userid, subject, topic, experience } = req.body.data;

    let isExist = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_players_experience WHERE userid = ? AND subject = ? AND topic = ? AND experience = ?`,
          [userid, subject, topic, experience]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    if (!isExist)
      await Database.Execute((database) =>
        database.query(
          "INSERT INTO sk_players_experience (userid, subject, topic, experience, creatorid, createdtime) VALUES (?, ?, ?, ?, ?, NOW())",
          [userid, subject, topic, experience, userid]
        )
      );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(
      Utilities.CreateResponse(
        req.validToken,
        req.validToken ? null : "Invalid token"
      )
    );
  });

  app.post("/player/total/experience", Authenticate, async (req, res) => {
    const { userid } = req.body.data;

    let result = await Database.Execute((database) =>
      database
        .query(
          "SELECT sum(experience) AS total FROM sk_players_experience WHERE userid = ?",
          [userid]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    if(req.validToken){
      let refreshToken = req.headers['refreshtoken']
      let token = req.headers['token']

      res.cookie('token', token, {httpOnly: true})
      res.cookie('refreshToken', refreshToken, {httpOnly: true})
      
      res.json(
        Utilities.CreateResponse(
          result ? true : false,
          result.total ? result.total : 0
        )
      );
    }
    else 
      res.json(Utilities.CreateResponse(false, 'Invalid token'))
  });

  app.post("/player/level-up", Authenticate, async (req, res) => {
    const { level, experience, userid } = req.body.data;

    await Database.Execute((database) =>
      database.query(
        "UPDATE sk_users SET level = ?, experience = ? WHERE id = ?",
        [level, experience, userid]
      )
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? null : 'Invalid token'));
  });

  app.post("/player/add/topic/timelapse", Authenticate, async (req, res) => {
    const { userid, subject, topic, start, end } = req.body.data;

    const existId = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_player_topic_timelapse WHERE userid = ? AND subject = ? AND topic = ?`,
          [userid, subject, topic]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row)).length > 0
            ? JSON.parse(JSON.stringify(row))[0].id
            : null;
        })
    );

    await Database.Execute((database) =>
      database.query(
        `INSERT INTO sk_player_topic_timelapse (${
          existId ? "id, " : ""
        }userid, subject, topic, start, end) VALUES (${
          existId ? existId + ", " : ""
        }?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE start = ?, end = ?`,
        [userid, subject, topic, start, end, start, end]
      )
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? null : 'Invalid token'));
  });

  app.post("/player/favoritesubject", Authenticate, async (req, res) => {
    const { userid } = req.body.data;

    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT favoritesubject FROM sk_students_view WHERE userid = ?`,
          [userid]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0].favoritesubject;
        })
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? result : 'Invalid Token'));
  });
};
