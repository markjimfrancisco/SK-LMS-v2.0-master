var multer = require("multer");
var path = require("path");

var Database = require("../Database/Database");
const { Authenticate } = require("../middleware/Auth");
const { CreateResponse } = require("../utilities.js");
var Utilities = require("../utilities.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./upload/file")
    switch (file.fieldname) {
      default:
        cb(null, "../assets/subjects/icon");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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
  app.post("/score/user/add", Authenticate, async (req, res) => {
    const { userid, subject, topic, source, points } = req.body.data;

    let isExist = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_user_scores WHERE userid = ? AND subject = ? AND topic = ? AND source = ? AND points = ?`,
          [userid, subject, topic, source, points]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    if (isExist.length <= 0) {
      await Database.Execute((database) =>
        database.query(
          `INSERT INTO sk_user_scores (userid, subject, topic, source, points, creatorid, createdtime) VALUES (?, ?, ?, ?, ?, ?, NOW());`,
          [userid, subject, topic, source, points, userid]
        )
      );
    }
    
    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(req.validToken, req.validToken ? null : 'Invalid token');
  });

  app.get("/score/user/count/topic/interacted", Authenticate, async (req, res) => {
    const { userid, topic } = req.query;

    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT count(*) as count FROM sk_user_scores WHERE userid = ? AND topic = ?;`,
          [userid, topic]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']
    
    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})


    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? result.count : 'Invalid token'));
  }); 

  app.get("/scores", Authenticate, async (req, res) => {
    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT sk_users.id AS id, sk_users.firstname, sum(points) as points FROM sk_user_scores JOIN sk_users ON sk_users.id = sk_user_scores.userid GROUP BY userid ORDER BY points DESC LIMIT 10;`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']
    
    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})


    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? result : 'Invalid token'));
  });
};
