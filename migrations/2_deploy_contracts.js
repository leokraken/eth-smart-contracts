var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Example = artifacts.require("./Example.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Example)
};
