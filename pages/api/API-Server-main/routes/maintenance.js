var fs = require("fs");
var multer = require("multer");
var unzipper = require("unzipper");

var Database = require("../Database/Database");
var Utilities = require("../utilities.js");
var { Authenticate } = require('../middleware/Auth')

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
  app.get("/maintenance/topics", Authenticate, async (req, res) => {
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

  app.post(
    "/maintenance/topic/add",
    upload.fields([
      { name: "icon", maxCount: 1 },
      { name: "content", maxCount: 1 },
    ]),
    Authenticate,
    async (req, res) => {
      const {
        title,
        description,
        color,
        type,
        subject,
        mode,
        userid,
        content,
      } = req.body;

      let contentName;

      const iconName = !res.req.files.icon[0].filename
        ? icon
        : res.req.files.icon[0].filename;

      if (!fs.existsSync(`${process.env.ASSETS_DIR}/topics/icon`)) {
        fs.mkdirSync(`${process.env.ASSETS_DIR}/topics/icon`);
      }

      if (!fs.existsSync(`${process.env.ASSETS_DIR}/topics/content`)) {
        fs.mkdirSync(`${process.env.ASSETS_DIR}/topics/content`);
      }

      if (type == "AR" || type == "VR" || type == "WebXR 2.0") {
        if (
          res.req.files.content &&
          !fs.existsSync(
            `${process.env.ASSETS_DIR}/topics/content/${res.req.files.content}`
          )
        )
          contentName = res.req.files.content[0].filename;
        else contentName = content;

        fs.createReadStream(
          `${process.env.ASSETS_DIR}/topics/content/${contentName}`
        ).pipe(
          unzipper.Extract({
            path: `${
              process.env.ASSETS_DIR
            }/topics/content/${contentName.replace(/([.])\w+/, "")}`,
          })
        );

        fs.unlinkSync(
          `${process.env.ASSETS_DIR}/topics/content/${contentName}`
        );

        await Database.Execute((database) =>
          database
            .query(`CALL CreateTopicMaintenance(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
              title.replace(" ", "-"),
              description,
              color,
              iconName,
              subject,
              type,
              mode,
              contentName.replace(/([.])\w+/, ""),
              userid,
            ])
            .then((row) => {
              return JSON.parse(JSON.stringify(row));
            })
        );
      } else {
        await Database.Execute((database) =>
          database
            .query(`CALL CreateTopicMaintenance(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
              title.replace(" ", "-"),
              description,
              color,
              iconName,
              subject,
              type,
              mode,
              content,
              userid,
            ])
            .then((row) => {
              return JSON.parse(JSON.stringify(row));
            })
        );
      }

      res.json(true);
    }
  );

  app.post(
    "/maintenance/topic/edit",
    upload.fields([
      { name: "icon", maxCount: 1 },
      { name: "content", maxCount: 1 },
    ]),
    Authenticate,
    async (req, res) => {
      const {
        id,
        title,
        description,
        color,
        icon,
        type,
        subject,
        mode,
        userid,
        content,
      } = req.body;

      //get prev topic info
      const prevTopic = await Database.Execute((database) =>
        database
          .query(`SELECT * FROM sk_topics_view WHERE id= ?`, [id])
          .then((row) => {
            return JSON.parse(JSON.stringify(row))[0];
          })
      );

      //delete previous icon
      //check if icon is existing and delete if exist!
      const iconPath = `${process.env.ASSETS_DIR}/topics/icon/${icon}`;

      if (fs.existsSync(iconPath)) {
        try {
          console.log("File successfully deleted!");
          fs.unlinkSync(iconPath);
        } catch (err) {
          console.error("File not found!");
        }
      }

      const iconName =
        Object.keys(res.req.files).length === 0 ||
        !res.req.files.icon
          ? icon
          : res.req.files.icon[0].filename;

      //delete previous content
      //check if icon is existing and delete if exist!
      const contentPath = `${process.env.ASSETS_DIR}/topics/content/${prevTopic.content}`;
      if (res.req.files.content && fs.existsSync(contentPath)) {
        fs.rmdirSync(contentPath, { recursive: true });
      }

      const contentName =
        Object.keys(res.req.files).length === 0 ||
        !res.req.files.content
          ? content
          : res.req.files.content[0].filename;

      //unzip
      fs.createReadStream(
        `${process.env.ASSETS_DIR}/topics/content/${contentName}`
      ).pipe(
        unzipper.Extract({
          path: `${
            process.env.ASSETS_DIR
          }/topics/content/${contentName.replace(/([.])\w+/, "")}`,
        })
      );

      //delete zip
      fs.unlinkSync(
        `${process.env.ASSETS_DIR}/topics/content/${contentName}`
      );

      //Store to Database
      await Database.Execute((database) =>
        database
          .query(
            `Call EditTopic(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, title.replace(" ", "-"), description, color, iconName, contentName.replace(/([.])\w+/, ""), type, mode, subject, userid]
          )
          .then((row) => {
            return JSON.parse(JSON.stringify(row));
          })
      );

      res.json(true);
    }
  );

  app.post("/maintenance/topic/delete", Authenticate, async (req, res) => {
    const { id } = req.body.data;

    if(req.validToken)
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

    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? null : 'Invalid token'));
  });
};
