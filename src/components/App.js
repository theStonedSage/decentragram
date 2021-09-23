import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
import { useQuery } from 'react-query';



const App = () => {
  const [account,setAccount] = useState('');

  async function loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram
    console.log(accounts);
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    if(window.web3) console.log('added')
  }

  useEffect(()=>{
    loadWeb3();
    loadBlockchainData();
    return () => {
      console.log("This will be logged on unmount");
    }
  })

  
  // const {data,status} = useQuery('');
  return (
    <div>
      <Navbar account={account} />
      {
        <Main />
      }
    </div>
  )
}



export default App;