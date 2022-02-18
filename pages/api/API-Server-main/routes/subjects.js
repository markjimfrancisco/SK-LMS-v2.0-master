var multer = require("multer");
var path = require("path");

var Database = require("../Database/Database");
const { Authenticate } = require("../middleware/Auth");
var Utilities = require("../utilities.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./upload/file")
    switch (file.fieldname) {
      default:
        cb(null, "../assets/private/subjects/icon");
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
  app.get("/subjects", async (req, res) => {
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
          `SELECT sk_subjects.id AS id, sk_subjects.title AS title, sk_subjects.description, sk_subjects.icon, sk_subjects.color, sk_crmentity.createdtime AS createdtime, sk_crmentity.modifiedtime AS modifiendtime FROM sk_subjects JOIN sk_crmentity ON sk_crmentity.crmid = sk_subjects.id WHERE deleted = 0 ${
            conditions ? "AND " + conditions : ""
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
    "/subject/edit",
    upload.single("icon"),
    Authenticate,
    async (req, res) => {
      const { id, title, description, color, icon } = req.body;

      const iconName = !res.req.file ? icon : res.req.file.filename;

      if (req.validToken) {
        await Database.Execute((database) =>
          database
            .query(`Call EditSubject(?, ?, ?, ?, ?)`, [
              id,
              title.replace(" ", "-"),
              description,
              color,
              iconName,
            ])
            .then((row) => {
    
              return JSON.parse(JSON.stringify(row));
            })
        );
      }

      res.json(
        Utilities.CreateResponse(
          req.validToken ? true : false,
          req.validToken ? null : "Invalid token"
        )
      );
    }
  );

  app.post(
    "/subject/add",
    upload.single("icon"),
    Authenticate,
    async (req, res) => {
      const { title, description, color, icon } = req.body;

      let result;
      
      if (req.validToken) {
        result = await Database.Execute((database) =>
          database
            .query(`CALL CreateSubject(?, ?, ?, ?)`, [
              title.replace(" ", "-"),
              description,
              color,
              res.req.file.filename,
            ])
            .then((row) => {
              return JSON.parse(JSON.stringify(row));
            })
        );
      }

      res.json(
        Utilities.CreateResponse(
          req.validToken ? result : false,
          req.validToken ? null : "Invalid token"
        )
      );
    }
  );

  app.post("/subject/delete", Authenticate, async (req, res) => {
    const { id } = req.body.data;

    if (req.validToken) {
      await Database.Execute((database) =>
        database
          .query(
            `UPDATE sk_crmentity SET deleted = 1 WHERE sk_crmentity.crmid = ?`,
            [id]
          )
          .then((row) => {
            return JSON.parse(JSON.stringify(row));
          })
      );
    }

    res.json(
      Utilities.CreateResponse(
        req.validToken ? true : false,
        req.validToken ? null : "Invalid token"
      )
    );
  });
};
