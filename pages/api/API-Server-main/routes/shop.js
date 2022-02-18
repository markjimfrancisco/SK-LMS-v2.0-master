var fs = require("fs");
var multer = require("multer");
var path = require("path");

var Database = require("../Database/Database");
var Utilities = require("../utilities.js");
var { Authenticate } = require('../middleware/Auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./upload/file")
    switch (file.fieldname) {
      default:
        cb(null, `${process.env.ASSETS_DIR}/proof-payment`);
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

if (!fs.existsSync(`${process.env.ASSETS_DIR}/proof-payment`)) {
  fs.mkdirSync(`${process.env.ASSETS_DIR}/proof-payment`);
}

module.exports = function (app) {
  app.post("/shop/order/update", upload.single("proof"), Authenticate, async (req, res) => {
    const {
      userid,
      id,
      firstname,
      lastname,
      address,
      email,
      mobileno,
      quantity,
      price,
      shippingfee,
      paymentmethod,
      status,
      creatorid,
    } = req.body;

    if(req.validToken)
      await Database.Execute((database) =>
        database.query(
          "UPDATE sk_orders SET firstname = ?, lastname = ?, address = ?, email = ?, mobileno = ?, quantity = ?, price = ?, shippingfee = ?, paymentmethod = ?, proof = ?, status = ?, modifiedby = ?, modifiedtime = NOW() WHERE id = ? AND creatorid = ?;",
          [
            firstname,
            lastname,
            address,
            email,
            mobileno,
            quantity,
            price,
            shippingfee,
            paymentmethod,
            res.req.filename,
            status,
            userid,
            id,
            creatorid,
          ]
        )
      );

    
    res.json(Utilities.CreateResponse(req.validToken, req.validToken ? null : 'Invalid token'));
  });

  app.post("/pay", Authenticate, async (req, res) => {
    const {
      userid,
      firstname,
      lastname,
      address,
      email,
      mobileno,
      price,
      quantity,
      shippingfee,
      paymentMethod,
    } = req.body.data;

    let status = paymentMethod == "banktransfer" ? "Unpaid" : "To be delivered";

    if(req.validToken){
      const orderid = await Database.Execute((database) =>
      database
        .query("CALL CreateOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [
          userid,
          firstname,
          lastname,
          address,
          email,
          mobileno,
          price,
          quantity,
          shippingfee,
          paymentMethod,
          status,
        ])
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0][0];
        })
    );

    res.json(Utilities.CreateResponse(orderid ? true : false, orderid));
    }else{
      res.json(Utilities.CreateResponse(false, 'Invalid token'));
    }
  });

  app.get("/orders", Authenticate, async (req, res) => {
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
          `SELECT * FROM sk_orders ${
            conditions ? "WHERE deleted = 0 && " + conditions : ""
          }`
        )
        .then((row) => {
          return JSON.parse(JSON.stringify(row));
        })
    );
    
    res.json(Utilities.CreateResponse(req.validToken ? result : false, req.validToken ? result : 'Invalid token'));
  });
};
