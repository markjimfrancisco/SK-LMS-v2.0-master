var multer = require("multer");
const ExcelJS = require('exceljs');

var Database = require("../Database/Database");
var Utilities = require("../utilities.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./upload/file")
    switch (file.fieldname) {
      case "background":
        cb(null, "../assets/background");
        break;
      case "model":
        cb(null, "../assets/model");
        break;
      default:
        cb(null, '../assets');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
  app.get("/schools", async (req, res) => {
    const { school } = req.query;

    delete req.query.school;

    let conditions = Utilities.createCondition(req.query, "LIKE");

    let result = await Database.Execute((database) =>
      database
        //   .query(`SELECT * FROM schools WHERE school = ${school} ${conditions ? 'AND ' + conditions : ''}`)
        .query(`SELECT * FROM sk_schools`)
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.json(result);
  });
};
