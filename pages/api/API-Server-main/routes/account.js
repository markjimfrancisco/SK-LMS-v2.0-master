var fs = require("fs");
var multer = require("multer");
var unzipper = require("unzipper");

var Database = require("../Database/Database");
var Utilities = require("../utilities.js");

var { Authenticate } = require('../middleware/Auth');

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
  app.post("/account/update/name", Authenticate, async (req, res) => {
    const { userid, firstname, middlename, lastname } = req.body.data;

    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    if(req.validToken){
      console.log('Verified Token')
      await Database.Execute((database) =>
        database
          .query(
            `UPDATE sk_users SET firstname = ?, middlename = ?, lastname = ? WHERE id = ${userid}`,
            [firstname, middlename, lastname, userid]
          )  
      );
      

      res.cookie('token', token, {httpOnly: true})
      res.cookie('refreshToken', refreshToken, {httpOnly: true})

      res.json(Utilities.CreateResponse(true, null));
    }else{
      res.json(Utilities.CreateResponse(false, 'invalid token'));
    }
      
  });

  app.post("/account/reset-password", async (req, res) => {
    const { code, password } = req.body.data;
  
    let resetPassword = await Database.Execute((database) =>
      database
        .query(
          `SELECT * FROM sk_reset_password JOIN sk_users ON sk_reset_password.userid = sk_users.id JOIN sk_user_types ON sk_users.usertype = sk_user_types.id WHERE code = ?`,
          [code]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );
  
    if (resetPassword) {
      await Database.Execute((database) =>
        database.query(
          `UPDATE sk_users SET password=MD5(\'${password}\') WHERE id = ${resetPassword.userid};`
        )
      );
  
      let result = await Database.Execute((database) =>
        database
          .query("CALL Login(?,?)", [resetPassword.username, password])
          .then((row) => {
            return JSON.parse(JSON.stringify(row))[0][0];
          })
      );
  
      let refreshToken = req.headers['refreshtoken']
      let token = req.headers['token']

      res.cookie('token', token, {httpOnly: true})
      res.cookie('refreshToken', refreshToken, {httpOnly: true})
      res.json(Utilities.CreateResponse(result ? true : false, result));
    }
  });
  
  app.post("/account/forgot-password", async (req, res) => {
    const { email } = req.body.data;
    const code = Utilities.GenerateCode(5);
    let user = await Database.Execute((database) =>
      database
        .query(
          `SELECT id, username ,CONCAT(firstname, ' ', lastname) as name FROM sk_users WHERE email = ?`,
          [email]
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );
  
    await Database.Execute((database) =>
      database.query(
        `INSERT INTO sk_reset_password (code, expiration, userid) VALUES (?, NOW(), ?)`,
        [code, user.id]
      )
    );

    //send email
    Utilities.SendEmailTemplate(
      [email],
      "no-reply@stockknowledge.org",
      "ResetPassword",
      `{\"domain\":\"${process.env.DOMAIN}\" ,\"username\":\"${user.username}\", \"name\":\"${user.name}\", \"code\": \"${code}\"}`
    );

    res.json(Utilities.CreateResponse(true, null));
  });
  
  app.get("/account/forgot-password/verify/code", async (req, res) => {
    const { value } = req.query;
  
    const result = await Database.Execute((database) =>
      database
        .query(`SELECT * FROM sk_reset_password WHERE code = ?`, [value])
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );
  
    res.json(Utilities.CreateResponse(result ? true : false, result));
  });
};
