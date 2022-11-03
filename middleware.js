const jwt = require("jsonwebtoken");
const User = require("./models/UserSchema");

const TOKEN = process.env.TOKEN;

const HasToken = async (req, res, next) => {
  const bearer = req.get("Authorization");
  const token = bearer.split(" ")[1];

  try {
    const payload = jwt.verify(token, TOKEN);
    const user = await User.findById(payload.userId);
    if (user) {
      next();
    }
  } catch (error) {
    res.status(401).send({ msg: "Please Login" });
  }
};

module.exports = HasToken;
