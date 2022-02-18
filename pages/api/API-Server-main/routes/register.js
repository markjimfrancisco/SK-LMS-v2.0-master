var multer = require("multer");
const ExcelJS = require("exceljs");

const { database } = require("../Database/Config");
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
  app.post("/register/student", async (req, res) => {
    const {
      username,
      email,
      password,
      firstName,
      middleName,
      lastName,
      mobileno,
      gender,
      dateofbirth,
      school,
      other,
      gradeLevel,
      favoriteSubject,
      careerGoal,
    } = req.body.data;

    let domain = Utilities.getDomain(email);
    let code = Utilities.GenerateCode(5);

    let userExist = await Database.Execute((database) =>
      database
        .query("SELECT * FROM sk_users WHERE email = ?", [email])
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    if (userExist.length > 0) {
      res.json(false);
    }

    let otherSchool =
      school == "other" && other
        ? await Database.Execute((database) =>
            database.query("CALL CreateOtherSchool(?)", [other]).then((row) => {
              return JSON.parse(JSON.stringify(row))[0][0].id;
            })
          )
        : 0;

    if (userExist.length <= 0) {
      let result = await Database.Execute((database) =>
        database
          .query(
            `call CreateStudent(?,?,?,?,?,?,?,?,?,?,${otherSchool},?,?,?,?,?)`,
            [
              email,
              username,
              password,
              firstName,
              middleName,
              lastName,
              mobileno,
              gender,
              dateofbirth,
              school,
              gradeLevel,
              favoriteSubject,
              careerGoal,
              domain,
              code,
            ]
          )
          .then((row) => {
            return JSON.parse(JSON.stringify(row))[0];
          })
      );

      Utilities.SendEmailTemplate(
        [email],
        "no-reply@stockknowledge.org",
        "ValidateAccount",
        `{\"name\":\"${firstName} ${lastName}\", \"code\": \"${code}\"}`
      );

      const token = jwt.sign({username: email}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_LIFESPAN})
      res.cookie('token', token, {httpOnly: true})
      
      res.json(
        Utilities.CreateResponse(
          result.length > 0 ? true : false,
          result ? result : null
        )
      );
    }
  });

  app.post("/register/auth/student", async (req, res) => {
    const {
      studentid,
      userid,
      username,
      firstName,
      middleName,
      lastName,
      mobileno,
      gender,
      dateofbirth,
      school,
      other,
      gradeLevel,
      favoriteSubject,
      careerGoal,
    } = req.body.data;

    //create procedure

    let otherSchool =
      school == "other" && other
        ? await Database.Execute((database) =>
            database.query("CALL CreateOtherSchool(?)", [other]).then((row) => {
              return JSON.parse(JSON.stringify(row))[0][0].id;
            })
          )
        : 0;

    let result = await Database.Execute((database) =>
      database
        .query(`call AuthSignup(?,?,?,?,?,?,?,?,?,?,${otherSchool},?,?,?)`, [
          studentid,
          userid,
          username,
          firstName,
          middleName,
          lastName,
          mobileno,
          gender,
          dateofbirth,
          school,
          gradeLevel,
          favoriteSubject,
          careerGoal,
        ])
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0][0];
        })
    );

    const token = jwt.sign({username: email}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_LIFESPAN})
    res.cookie('token', token, {httpOnly: true})

    res.json(
      Utilities.CreateResponse(result ? true : false, result ? result : null)
    );

    res.json(true);
  });

  app.get("/register/verify/username", async (req, res) => {
    const { value } = req.query;

    let result = await Database.Execute((database) =>
      database
        .query(`SELECT * FROM sk_users WHERE username = \'${value}\'`)
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(result.length > 0 ? true : false);
  });

  app.get("/register/verify/email", async (req, res) => {
    const { value } = req.query;

    let result = await Database.Execute((database) =>
      database
        .query(`SELECT * FROM sk_users WHERE email = \'${value}\'`)
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(result ? true : false);
  });

};
