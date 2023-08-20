const jwt = require("jsonwebtoken");
const userModel = require("./models/user");

const TOKEN = process.env.TOKEN;

const getUserId = async (bearer) => {
  const token = bearer.split(" ")[1];

  const payload = jwt.verify(token, TOKEN);
  const user = await userModel.getUserById(payload.userId);

  if (user) {
    return user.userId;
  } else {
    let err = new Error(`Please Login`);
    err.status = 404;
    throw err;
  }
};

module.exports = getUserId;
