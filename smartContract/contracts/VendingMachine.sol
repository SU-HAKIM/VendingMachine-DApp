//SPDX-Lisence-Identifier:GPL-3.0

pragma solidity 0.8.11;

contract VendingMachine{
    address public owner;
    mapping(address=>uint) public donutBalances;

    constructor()  {
        owner=msg.sender;
        donutBalances[address(this)]=100;
    }

    function getVendingMachineBalance() public view returns(uint){
        return donutBalances[address(this)];
    }

    function restock(uint amount) public {
        require(msg.sender==owner,"Only the Owner can restock the machine.");
        donutBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(donutBalances[address(this)] >= amount,"Sorry , Do not have enough donut.");
        require(msg.value >= amount * 1000 wei , "You must pay at least 2 ether per donut");
        donutBalances[address(this)] -= amount;
        donutBalances[msg.sender] += amount;
    }
}