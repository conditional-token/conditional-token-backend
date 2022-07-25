const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var account = new Schema({
  accountId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    notNull: true,
  },
});

account.methods.getInfo = function getInfo() {
  return {
    accountId: this.accountId,
    userId: this.userId,
    id: this._id,
  };
};

/**
 *
 * @constructor
 *
 */

account.methods.createAccount = function createAccount(req) {
  let accountId = req.body.accountId;
  let userId = req.user.userId;

  this.accountId = accountId;
  this.userId = userId;
};

module.exports = mongoose.model("Account ", account);
