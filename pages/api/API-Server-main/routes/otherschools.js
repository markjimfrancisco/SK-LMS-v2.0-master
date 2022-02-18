var multer = require("multer");
const ExcelJS = require("exceljs");

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
        cb(null, "../assets");
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
  app.get("/other-schools", async (req, res) => {
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
          `SELECT * FROM sk_other_school JOIN sk_crmentity ON sk_crmentity.crmid = sk_other_school.id ${
            conditions
              ? "WHERE " + conditions + "AND sk_crmentity.deleted = 0"
              : "WHERE sk_crmentity.deleted = 0"
          }`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(result);
  });

  app.post(
    "/import/other-schools",
    upload.single("schools"),
    async (req, res) => {
      const workbook = new ExcelJS.Workbook();

      const schoollist = await workbook.xlsx.readFile(req.file.path);
      const worksheet = schoollist.getWorksheet(1);

      let queries = [];

      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber == 1) return;

        const schoolname = row.values[2].trim();

        queries.push(
          Database.Execute((database) =>
            database
              .query(`CALL CreateOtherSchool(?)`, [schoolname])
              .catch((err) => {
                console.log(`Error on: ${rowNumber} ${schoolname}`);
              })
          )
        );
      });

      Promise.all(queries);
      res.json(true);
    }
  );
};
