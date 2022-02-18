var app = require("express")();
var http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

var bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");
var jwt = require('jsonwebtoken');

var { Authenticate } = require('./middleware/Auth');

require("dotenv").config();

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
      case 'icon':
        cb(null, `../assets/private/subjects/icon`);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var registerRoutes = require("./routes/register");
var gradelevelRoutes = require("./routes/gradelevels");
var subjectRoutes = require("./routes/subjects");
var topicsRoutes = require("./routes/topics");
const schoolsRoutes = require("./routes/schools");
const otherschools = require("./routes/otherschools");
const analyticsRoutes = require("./routes/analytics");
const shopRoutes = require("./routes/shop");
const accountRoutes = require("./routes/account");
const maintenanceRoutes = require("./routes/maintenance");
const scoreRoutes = require("./routes/score");
const playerRoutes = require("./routes/player");
const authRoutes = require("./routes/auth")

var Database = require("./Database/Database.js");
var Utilities = require("./utilities.js");

const Client = require("./Client");
const Room = require("./Room");
const { CreateResponse } = require("./utilities.js");
const { database } = require("./Database/Config");

app.use(cors({credentials: true,  origin: [process.env.DOMAIN] }));
app.use(bodyParser.json());

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

const upload = multer({ storage: storage });

var clients = [];
var rooms = [];

registerRoutes(app);
gradelevelRoutes(app);
subjectRoutes(app);
schoolsRoutes(app);
otherschools(app);
topicsRoutes(app);
analyticsRoutes(app);
shopRoutes(app);
accountRoutes(app);
maintenanceRoutes(app);
scoreRoutes(app);
playerRoutes(app);
authRoutes(app);

app.post("/login", async (req, res) => {
  const { username, password } = req.body.data;

  let result = await Database.Execute((database) =>
    database
      .query("CALL Login(?,?)", [username, password])
      .then((row) => {
        return JSON.parse(JSON.stringify(row))[0];
      })
      .catch((err) => {
        throw err;
      })
  );

  const token = jwt.sign({username: username}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_LIFESPAN})
  const refreshToken = jwt.sign({username: username}, process.env.REFRESH_KEY, {expiresIn: process.env.REFRESH_LIFESPAN});

  if(username && password)
    await Database.Execute( database => database.query('INSERT INTO sk_user_logs (username, token, refreshToken) VALUES (?, ?, ?);', [username, token, refreshToken]))

  res.cookie('token', token, {httpOnly: false})
  res.cookie('refreshToken', refreshToken, {httpOnly: false})
  res.status(200);
  res.json(Utilities.CreateResponse(result ? true : false, result));
});

app.post("/login/auth", async (req, res) => {

  const { email, name } = req.body.data;

  const token = jwt.sign({username: email}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_LIFESPAN})

  let result = await Database.Execute((database) =>
    database
      .query("CALL AuthLogin(?,?)", [name, email])
      .then((row) => {
        return JSON.parse(JSON.stringify(row))[0];
      })
      .catch((err) => {
        throw err;
      })
  );

  res.cookie('token', token, {httpOnly: true})
  res.json(
    Utilities.CreateResponse(
      result && result.length > 0 ? true : false,
      result[0]
    )
  );
});

app.post("/logout", async (req, res) => {
  res.clearCookie('token')
  res.clearCookie('refrestToken')

  res.json(Utilities.CreateResponse(true, null));
});

app.post("/request/demo", async (req, res) => {
  const { name, email, message } = req.body.data;

  Utilities.SendEmailTemplate(
    [process.env.REQUEST_RECEIVER],
    "no-reply@stockknowledge.org",
    "RequestDemo",
    `{\"name\":\"${name}\" ,\"email\":\"${email}\", \"message\":\"${message}\"}`
  );

  res.json(true);
});

app.get("/verify/verification-code", async (req, res) => {
  const { value } = req.query;

  const result = await Database.Execute((database) =>
    database
      .query(`SELECT * FROM sk_account_verification WHERE code = ?`, [value])
      .then((row) => {
        return JSON.parse(JSON.stringify(row))[0];
      })
  );

  res.json(Utilities.CreateResponse(result ? true : false, result));
});

app.post("/validate/account", Authenticate, async (req, res) => {
  const { code, userid } = req.body.data;

  let refreshToken = req.headers['refreshtoken']
  let token = req.headers['token']

  const result = await Database.Execute((database) =>
    database
      .query(
        `SELECT * FROM sk_account_verification WHERE code = ? AND userid = ?`,
        [code, userid]
      )
      .then((row) => {
        return JSON.parse(JSON.stringify(row))[0];
      })
  );
  
  if (req.validToken && result){
    await Database.Execute((database) =>
      database.query(`UPDATE sk_users SET verified = 1 WHERE id = ?`, [userid])
    );

    res.cookie('token', token, {httpOnly: true})
    res.cookie('refreshToken', refreshToken, {httpOnly: true})

    res.json(Utilities.CreateResponse(result ? true : false, null));
  }else{
    res.json(Utilities.CreateResponse(false, 'invalid token'));
  }
});

app.get("/genders", async (req, res) => {
  let result = await Database.Execute((database) =>
    database.query(`SELECT * FROM sk_gender`).then((row) => {
      return JSON.parse(JSON.stringify(row));
    })
  );

  res.json(result);
});

app.get("/days", async (req, res) => {
  let conditions = Utilities.createCondition(req.query, "LIKE");

  let result = await Database.Execute((database) =>
    database
      .query(
        `SELECT * FROM sk_school_week ${
          conditions ? "WHERE " + conditions : ""
        }`
      )
      .then((row) => {
        return JSON.parse(JSON.stringify(row));
      })
  );

  res.json(result);
});

app.get("/calendar", async (req, res) => {
  const now = new Date();
  const year = req.query.year ? req.query.year : now.getFullYear();
  const month = req.query.month ? req.query.month : now.getMonth();

  const calendar = await Utilities.GenerateCalendar(
    parseInt(year),
    parseInt(month)
  );


  res.json(calendar);
});

app.get("/calendar/days", async (req, res) => {

  res.json(await Utilities.GenerateDays(req.query.monthlong));
});

app.get("/calendar/today", async (req, res) => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const now = `${year}-${month + 1}-${day}`;

  const events = await Database.Execute((database) =>
    database
      .query(
        "SELECT * FROM sk_school_event WHERE DATE(`on`) = ? AND deleted = 0",
        [now]
      )
      .then((row) => {
        return JSON.parse(JSON.stringify(row));
      })
  );


  res.json(true);
});

app.post("/screen", async (req, res) => {
  const { width, height } = req.body.data;
  let exist = null;

  exist = await Database.Execute((database) =>
    database
      .query(
        "SELECT height, width FROM sk_user_screens WHERE width = ? AND height = ?",
        [width, height]
      )
      .then((row) => {
        return JSON.parse(JSON.stringify(row))[0];
      })
  );
  if (!exist)
    Database.Execute((database) =>
      database.query(
        "INSERT INTO sk_user_screens (width, height) VALUES (?, ?)",
        [width, height]
      )
    );

  res.json(true);
});

http.listen(process.env.PORT, function () {
  console.log(`listening on *:${process.env.PORT}`);
});
