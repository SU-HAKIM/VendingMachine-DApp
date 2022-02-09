// const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/v3/e3c1c48968cd492d9e9faad0d4bda502'
// );

// const web3 = new Web3(provider);



const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "donutBalances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVendingMachineBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "restock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const vendingMachineContract = async (web3) => {
    return new web3.eth.Contract(abi, "0x0cAC937d2C415E5CbE134DD3A7E467B31895E81B");

}

export default vendingMachineContract

