const jwt = require("jsonwebtoken");
const userModel = require("./models/user");

const TOKEN = process.env.TOKEN;

const HasToken = async (req, res, next) => {
  const bearer = req.get("Authorization");
  const token = bearer.split(" ")[1];

  const payload = jwt.verify(token, TOKEN);
  const user = await userModel.getUserById(payload.userId);

  if (user) {
    next();
  } else {
    let err = new Error(`Please Login`);
    err.status = 404;
    throw err;
  }
};

module.exports = HasToken;
