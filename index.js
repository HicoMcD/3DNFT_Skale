import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import "./styles.css";

const Filestorage = require('@skalenetwork/filestorage.js');
// https://web3js.readthedocs.io/en/v1.3.4/web3.html#providers
let web3 = new Web3("http://eth-global-10.skalenodes.com:10643/");
let endpoint = "https://eth-global-10.skalenodes.com:10643/";
let chainId = "0xeef5f4e8bc294";

/**
 * Simple example of how to use the new Web3
 * provider connected to SKALE to retrieve the
 * Chain ID.
 */
 web3.eth.getChainId().then((response) => {
  console.log(response);
  document.getElementById("Chain_ID").innerHTML = response;
});

/**
 * MetaMask Documentation: https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
 *
 * For more information on how to
 * form the encrypted message please see:
 * https://eips.ethereum.org/EIPS/eip-3085
 */
let switchToSKALE = {
  chainId: chainId,
  chainName: "SKALE Network Testnet",
  rpcUrls: [endpoint],
  nativeCurrency: {
    name: "SKALE ETH",
    symbol: "skETH",
    decimals: 18
  },
  blockExplorerUrls: [
    "https://expedition.dev/?network=SKALE&rpcUrl=" + endpoint
  ]
};

async function getWeb3() {
  web3 = window.web3;

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log("MetaMask - Web 3 Initialized!default!");

      //Get user wallet accounts
      window.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.error(error);
        }
        console.log(accounts);

        //request change to SKALE Network
        window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [switchToSKALE, accounts[0]]
          })
          .catch((error) => console.log(error.message));
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    console.log("MetaMask - Web 3 Initialized!legacy!");
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

async function createDirectory(directoryPath) {
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
      "http://eth-global-10.skalenodes.com:10643/"
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  //let privateKey = '0xbc9b36fe3264c10d320f67e1a096d448dd8554ee2453f902dc647b4e156b7cbe';
  //let account = "0xAC225867DB6268F552Cda83301D2bfEfD1AfCA7b";
  //fs.createDirectory("YOUR_ADDRESS", 'directory_A', pk) 
  //fs.createDirectory("YOUR_ADDRESS", 'directory_A/directory_B', pk) 
  console.log(await web3.eth.getBalance('0xAC225867DB6268F552Cda83301D2bfEfD1AfCA7b'));

  await filestorage.createDirectory('0xAC225867DB6268F552Cda83301D2bfEfD1AfCA7b', 'TopoToken','0xbc9b36fe3264c10d320f67e1a096d448dd8554ee2453f902dc647b4e156b7cbe'); 
    console.log(directoryPath);
  
}

function App() {
  return (
    <div className="App">
      <div className="NaveBar-Title">
      <h1>Topo Token T3D</h1>
      </div>
      <br />
      <div className="MetaMask"></div>
      <button onClick={getWeb3}>Switch MetaMask to SKALE</button>
      <button onClick={createDirectory}>Storage</button>
     <div>
     Skale Chain ID: <span id="Chain_ID" />
     </div>
   </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);