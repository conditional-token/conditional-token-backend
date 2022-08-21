const ContractModel = require('../model/contract.model');

exports.getAddress = (req, res) => {
  try {
        return res.json({ address: ContractModel.getAddress()});
      }
   catch (error) {
    res.status(400).json({ message: error + "" });
  }
};

exports.getAbi = (req, res) => {
    try {
          return res.json({ abi: ContractModel.getAbi()});
        }
     catch (error) {
      res.status(400).json({ message: error + "" });
    }
  };


