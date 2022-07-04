const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

exports.getCredentials = (req) => {
  if (!req.headers["authorization"]) {
    throw new Error("Not authenticated");
  }
  let token = req.headers["authorization"].split(" ")[1];

  let dataToken = jwt.verify(token, constants.JWT_KEY);

  let credentials = {
    name: dataToken.name,
    userId: dataToken.userId,
    email: dataToken.email,
    isAdmin: user.isAdmin,
    isAutorized: user.isAutorized,
  };

  return credentials;
};

exports.generateToken = (user) => {
  let tokenData = {
    email: user.email,
    name: user.name,
    userId: user._id,
    isAdmin: user.isAdmin,
    isAutorized: user.isAutorized,
  };

  var token = jwt.sign(tokenData, constants.JWT_KEY, {
    expiresIn: "720h",
    algorithm: "HS256",
  });

  return token;
};
