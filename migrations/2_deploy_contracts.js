var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var SimpleAuction = artifacts.require("./SimpleAuction.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(SimpleAuction, 100000000, '0x627306090abab3a6e1400e9345bc60c78a8bef57')
};
