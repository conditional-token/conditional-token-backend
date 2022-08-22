const Account = require("../model/account.model");

exports.upsertAccount = (req, res) => {
  try {
    if (!req.body.accountId)
      return res.status(400).json({ message: "AccountId is required" });

    Account.findOneAndUpdate(
      { userId: req.user.userId },
      { userId: req.user.userId, accountId: req.body?.accountId },
      { upsert: true },
      function (error, account) {
        if (error) return res.status(400).json({ message: error });
        return res.json({ message: "Account updated", account });
      }
    );
  } catch (error) {
    res.status(400).json({ message: error + "" });
  }
};

exports.getAccount = (req, res) => {
  if (req.user.userId) {
    Account.findOne({ userId: req.user.userId }, function (error, account) {
      if (error) return res.status(400).json({ message: error });

      if (!account) return res.status(404).json({ message: "Account not found" });

      return res.json({ message: "Account found", accountId: account.accountId });
    });
  } else {
    res.status(400).json({ message: "Account not found" });
  }
};
