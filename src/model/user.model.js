const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const constants = require("../config/constants");

var user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isAutorized: {
    type: Boolean,
    required: true,
  },
});

user.methods.getInfo = function getInfo() {
  return {
    name: this.name,
    registerDate: this.registerDate,
    email: this.email,
    isAdmin: this.isAdmin,
    id: this._id,
  };
};

/**
 *
 * @constructor
 *
 */

user.methods.createUser = function createUser(req) {
  let name = req.body.name;
  let createdAt = new Date();
  let updatedAt = new Date();
  let email = req.body.email;

  this.generatePassWord(req.body.password);

  this.email = email;
  this.name = name;
  this.createdAt = createdAt;
  this.updatedAt = updatedAt;

  if (!req.body.isAdmin) {
    this.isAdmin = false;
  } else {
    this.isAdmin = req.body.isAdmin;
  }

  this.isAutorized = true;
};

user.methods.generatePassWord = function generatePassWord(password) {
  const hash = bcrypt.hashSync(password, constants.SALT_ROUNDS);
  this.password = hash;
};

user.methods.getId = function getId() {
  return this._id;
};
user.methods.getName = function getName() {
  return this.name;
};
user.methods.getRegisterDate = function getRegisterDate() {
  return this.registerDate;
};
user.methods.getPassword = function getPassword() {
  return this.password;
};

user.methods.getPassword = function getPassword() {
  return this.password;
};

user.methods.setPassword = function setPassword(pass) {
  this.updatedAt = new Date();
  return (this.password = pass);
};

user.methods.toString = function toString() {
  return "User";
};

user.methods.getIsAdmin = function isAdmin() {
  return this.isAdmin;
};

module.exports = mongoose.model("User ", user);
