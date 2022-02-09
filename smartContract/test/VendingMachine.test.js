const VendingMachine = artifacts.require("../contracts/VendingMachine.sol");


contract("VendingMachine", accounts => {
    before(async () => {
        instance = await VendingMachine.deployed();
    })

    it("ensures that the starting balance of the vending machine is 100", async () => {
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 100, "The balance should ne equal to 100.")
    })

    it("ensures the balance of the vending machine can be updated", async () => {
        await instance.restock(200);
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 300, "The balance should ne equal to 300.")
    })

    it("allows donuts to be purchased", async () => {
        await instance.purchase(5, { from: accounts[0], value: 5 * 100 });
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 295, "The balance should ne equal to 295.")
    })
})