const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

const NO_TOKEN = "No token provided";

module.exports = function (req, res, next) {
  try {
    if (
      !req.headers["authorization"] ||
      req.headers["authorization"].split(" ").length < 2
    ) {
      throw new Error(NO_TOKEN);
    }
    const token = req.headers["authorization"].split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Access Denied, token required" });

    const decoded = jwt.verify(token, constants.JWT_KEY);

    req.user = decoded;

    if (["GET", "PUT", "POST"].includes(req.method)) {
      next();
    } else {
      return res.status(401).json({ message: "Access denied" });
    }
  } catch (error) {
    if (error === NO_TOKEN) {
      return res.status(400).json({ message: "Token Required" });
    }
    return res.status(400).json({ message: " Invalid Token." });
  }
};
