import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Web3 from 'web3';
import vendingMachineContract from '../blockchain/vending';

const VendingMachine = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [inventory, setInventory] = useState(0);
  const [myDonuts, setMyDonuts] = useState(0);
  const [amount, setAmount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState('');
  const [vmContract, setVmContract] = useState(null);

  useEffect(() => {
    if (vmContract) getMyDonutHandler();
    if (vmContract && address) getInventoryHandler();
  }, [vmContract, address])
  const getInventoryHandler = async () => {
    try {
      const inventory = await vmContract.methods.getVendingMachineBalance().call();
      setInventory(inventory);
    } catch (error) {
      setError(error.message);
    }
  }
  const getMyDonutHandler = async () => {
    try {
      const count = await vmContract.methods.donutBalances(address).call();
      setMyDonuts(count);
    } catch (error) {
      setError(error.message);
    }
  }
  const buyDonutHandler = async () => {

    try {
      await vmContract.methods.purchase(Number(amount)).send({
        from: address,
        value: Number(amount) * 1000
      })
      setSuccess("Successfully purchased " + amount + " Doughnut 👍 .Refresh to see result.");
      setMyDonuts(myDonuts + Number(amount));
    } catch (error) {
      setError(error.message);
    }
  }
  const handleChange = (e) => {
    setAmount(e.target.value);
  }
  const connectWalletHandler = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0])
        const vm = await vendingMachineContract(web3);
        setVmContract(vm);
        setError('')
        console.log(accounts[0], vm)
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.error("Please install Meta Mask")
    }
  }

  return <>
    <Head>
      <title>Vending Machine DApp</title>
      <meta name='description' content='A Decentralized application' />
    </Head>
    <nav className="p-2 bg-dark text-white">
      <div className="container d-flex justify-content-between">
        <div className="navbar-brand">VendingMachine</div>
        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={connectWalletHandler}>Add Wallet</button>
        </div>
      </div>
    </nav>
    <section>
      <div className="container">
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {success && <div className="alert alert-success mt-2">{success}</div>}
      </div>
    </section>
    <section className="pt-2 bg-light w-50 mx-auto mt-4 p-2">
      <div className="container">
        <div className="card card-body mb-3">
          <h6>Vending Machine inventory : {inventory}</h6>
        </div>
        <div className="card card-body mt-3">
          <h6>My Doughnuts : {myDonuts}</h6>
        </div>
      </div>
      <div className="container mt-2">
        <label htmlFor="" className="my-1">Buy Donut : </label>
        <input className="form-control my-2" value={amount} type='number' onChange={handleChange} placeholder="amount of donut......" />
        <button className="btn btn-primary" onClick={buyDonutHandler}>Buy</button>
      </div>
    </section>
  </>
};

export default VendingMachine;
