import styles from "../styles/VendingMachine.module.scss";
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from 'web3';

const VendingMachine = () => {
  let web3;
  const connectWalletHandler = () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum)
      console.log(web3);
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

      </div>
    </section>
  </>
};

export default VendingMachine;
