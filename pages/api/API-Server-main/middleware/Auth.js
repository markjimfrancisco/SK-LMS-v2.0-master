var Database = require("../Database/Database");

var jwt = require('jsonwebtoken');
const Utilities = require("../utilities");

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
exports.Authenticate = (req, res, next) => {
  let token = req.headers['token']

  if(token != 'undefined'){
    try{
        jwt.verify(token, process.env.SECRET_KEY);
        req.validToken = true;
        next();
    } catch (err) {
      console.log(err);
      req.validToken = false
      next();
    }
  }else{
    req.validToken = false
    next();
  }
}

exports.Refresh = async (req, res, next) => {
    const { username, key } = req.body.data;
    let refreshToken = req.headers['refreshtoken']
    let token = req.headers['token']

    let tokenData = await Database.Execute((database) =>
      database
        .query("SELECT id FROM sk_user_logs WHERE username = ? AND refreshToken = ?", [username, refreshToken])
        .then((row) => {
          return JSON.parse(JSON.stringify(row))[0];
        })
    );

    try{
        jwt.verify(token, process.env.SECRET_KEY);
        jwt.verify(refreshToken, process.env.REFRESH_KEY);

        req.token = token;
        req.refreshToken = refreshToken;
    } catch (err) {
        if(key == process.env.REFRESH_KEY){
            token = jwt.sign({username: username}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_LIFESPAN})
            refreshToken = jwt.sign({username: username}, process.env.REFRESH_KEY, {expiresIn: process.env.REFRESH_LIFESPAN}) 
            
            req.token = token;
            req.refreshToken = refreshToken;
        }
    }

    req.tokenData = tokenData;
    next();
}
