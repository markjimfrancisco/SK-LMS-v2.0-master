var fs = require("fs");
var multer = require("multer");
var unzipper = require("unzipper");

var Database = require("../Database/Database");
const { Authenticate } = require("../middleware/Auth");
const { CreateResponse } = require("../utilities.js");
var Utilities = require("../utilities.js");

if (!fs.existsSync(`${process.env.ASSETS_DIR}/topics/icon`)) {
  fs.mkdirSync(`${process.env.ASSETS_DIR}/topics/icon`);
}

if (!fs.existsSync(`${process.env.ASSETS_DIR}/topics/content`)) {
  fs.mkdirSync(`${process.env.ASSETS_DIR}/topics/content`);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (file.fieldname) {
      case "icon":
        cb(null, `${process.env.ASSETS_DIR}/topics/icon`);
        break;
      case "content":
        cb(null, `${process.env.ASSETS_DIR}/topics/content`);
        break;
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
  app.get("/topics", Authenticate, async (req, res) => {
    let conditions = "";

    if (req.query) {
      let queries = [];
      let keys = Object.keys(req.query);

      keys.forEach((key) => {
        queries.push(`${key} LIKE \'%${req.query[key]}%\'`);
      });

      conditions = queries.join(" AND ");
    }

    let result = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_topics_view ${
            conditions ? "WHERE " + conditions : ""
          }`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.status(200);
    res.json(Utilities.CreateResponse(req.validToken ? true : false, req.validToken ? result : null));
  });
};
