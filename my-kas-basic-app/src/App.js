// import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [latestBlock, setLatestBlock] = useState("");
  const [eoaInfo, setEoaInfo] = useState({});
  const [newAccount, setNewAccount] = useState({});

  //삽질기록, 객체 사용 지양
  // let eoa_info = {
  //   address: eoaInfo,
  //   balance: "0",
  // };

  const handleEOAinfo = (e) => {
    setEoaInfo(e.target.value);
  };

  async function getLatestBlock() {
    let result = await axios.get("http://localhost:8080/latestblock");
    setLatestBlock(result.data);
  }
  async function getEoaInfo() {
    let result = await axios.post("http://localhost:8080/eoainfo", {
      account: eoaInfo,
    });
    // console.log(result.data.account.balance);
    // eoa_info.balance = result.data.account.balance.toString();
    // parseInt(hexString, 16);
    setEoaInfo({
      address: eoaInfo,
      balance: parseInt(result.data.account.balance, 16), //HEX to DEC
    });
  }

  async function getNewAccount() {
    let result = await axios.get("http://localhost:8080/createaccount");
    // console.log(result.data);
    setNewAccount({
      address: result.data.address,
      chainId: result.data.chainId,
      krn: result.data.krn,
      publicKey: result.data.publicKey,
      updatedAt: result.data.updatedAt,
    });
  }
  useEffect(() => {
    console.log("update");
  }, [latestBlock, eoaInfo]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>KAS Basic test using caver-js</h1>
        <h1>All test is possible in BAOBAB Testnet</h1>
        <h3>You can request Lastest Block Numnber here</h3>
        <div>Latest Block address</div>
        <button onClick={getLatestBlock}>Latest Block</button>
        <div>Lastest Block : {latestBlock}</div>
        <br />

        <h3>...And You can check your EOA Information Here</h3>
        <div>Enter EOA address</div>
        <input onChange={handleEOAinfo}></input>
        <button onClick={getEoaInfo}>EOA Info</button>
        <div>address : {eoaInfo.address}</div>
        <div>Lastest Block : {eoaInfo.balance}</div>

        <h3>
          ...Or You can make new account here, and this account will be saved in
          KAS basic KRN
        </h3>
        <button onClick={getNewAccount}>Give Me New Account</button>
        <div>address : {newAccount.address}</div>
        <div>chainId : {newAccount.chainId}</div>
        <div>krn : {newAccount.krn}</div>
        <div>publicKey : {newAccount.publicKey}</div>
        <div>updatedAt : {newAccount.updatedAt}</div>
      </header>
    </div>
  );
}

export default App;
