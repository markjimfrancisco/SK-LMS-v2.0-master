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
  app.get("/analytics/count/student/school", Authenticate, async (req, res) => {
    const result = await Database.Execute((database) =>
      database
        .query(
          "SELECT sk_schools.name, COUNT(sk_schools.name) AS count FROM sk_students JOIN sk_schools ON sk_schools.id = sk_students.school GROUP BY sk_schools.name ORDER BY count desc;"
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.json(
      Utilities.CreateResponse(
        req.validToken && (result || result.length > 0) ? result : false,
        req.validToken ? result : 'Invalid token'
      )
    );
  });

  app.get("/analytics/count/student/other", Authenticate, async (req, res) => {
    const result = await Database.Execute((database) =>
      database
        .query(
          "SELECT sk_other_school.name, count(sk_other_school.name) as count FROM sk_students JOIN sk_schools ON sk_schools.id = sk_students.school JOIN sk_other_school ON sk_other_school.id = sk_students.other WHERE sk_schools.name = 'other' GROUP BY sk_other_school.name;"
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.json(
      Utilities.CreateResponse(
        req.validToken && (result || result.length > 0) ? result : false,
        req.validToken ? result : 'Invalid token'
      )
    );
  });

  app.get("/analytics/count/student/favoritesubject", Authenticate, async (req, res) => {
    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']
    
    const result = await Database.Execute((database) =>
      database
        .query(
          "SELECT favoritesubject as name, count(favoritesubject) as count FROM sk_students_view GROUP BY favoritesubject ORDER BY count DESC;"
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(
      Utilities.CreateResponse(
        req.validToken && (result || result.length > 0) ? result : false,
        req.validToken ? result : 'Invalid token'
      )
    );
  });


  app.get("/analytics/count/student/all", Authenticate, async (req, res) => {
    console.log(req.headers);
    let result = await Database.Execute((database) =>
      database
        .query("SELECT COUNT(*) AS count FROM sk_students")
        .then((row) => {
          return JSON.parse(JSON.stringify(row[0].count));
        })
    );

    res.json(
      Utilities.CreateResponse(
        req.validToken && (result || result.length > 0) ? result : false,
        req.validToken ? result : 'Invalid token'
      )
    );
  });
};
