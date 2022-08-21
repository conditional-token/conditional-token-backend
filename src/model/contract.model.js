const Contract = require("../assets/contract");
const constants = require("../config/constants");

const ContractModel = {};

ContractModel.getAddress = () => {
  return Contract.networks[constants.CONTRACT_NETWORK].address;
};

ContractModel.getAbi = () => {
  return Contract.abi;
};

module.exports = ContractModel;
