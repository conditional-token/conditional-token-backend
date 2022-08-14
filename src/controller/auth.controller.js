const Auth = require("../model/auth.model");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  try {
    let newUser = new User();

    newUser.createUser(req);

    newUser.save(function (error) {
      if (!error) {
        res.status(201).json({ message: "Created User", user: newUser.getInfo() });
      } else if ((error + "").includes("duplicate key error")) {
        res.status(409).json({ message: "Email already exists" });
      } else {
        res.status(400).json({ message: error });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error + "" });
  }
};

exports.login = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function (error, user) {
      if (
        !error &&
        user &&
        bcrypt.compareSync(req.body.password, user.password)
      ) {
        let token = Auth.generateToken(user);

        res.json({
          sucess: true,
          token: token,
          user: user.getInfo(),
        });
      } else {
        res.status(401).json({ message: "User not found" });
      }
    });
  } else {
    res.status(401).json({ message: "User not found" });
  }
};
