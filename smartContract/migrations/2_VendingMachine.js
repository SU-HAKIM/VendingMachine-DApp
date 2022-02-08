const VendingMachine = artifacts.require("../contracts/VendingMachine.sol");

module.exports = function (deployer) {
    deployer.deploy(VendingMachine);
};
