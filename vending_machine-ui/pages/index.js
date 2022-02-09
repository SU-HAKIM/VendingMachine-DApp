import styles from "../styles/VendingMachine.module.scss";
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Web3 from 'web3';

const VendingMachine = () => {
  const [error, setError] = useState('')
  let web3;
  const connectWalletHandler = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum)
        console.log(web3);
        setError('')
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
      </div>
    </section>
  </>
};

export default VendingMachine;
