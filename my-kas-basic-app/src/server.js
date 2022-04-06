const config = require("../config.js");
const caver = config.caver_ext;
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

async function getLatestBlockNumber() {
  const blockNumber = await caver.rpc.klay.getBlockNumber();
  return blockNumber;
}

async function getEoaInfo(account) {
  const eoaInfo = await caver.rpc.klay.getAccount(account);
  return eoaInfo;
}

async function makeAccount() {
  const accountInfo = await caver.kas.wallet.createAccount();
  return accountInfo;
}
app.get("/latestblock", (req, res) => {
  try {
    getLatestBlockNumber().then((result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

app.post("/eoainfo", (req, res) => {
  try {
    let account = req.body.account;
    if (!account) {
      res.status(400).send("Invalid Account");
    } else {
      getEoaInfo(account).then((result) => {
        console.log(result);
        res.status(200).json(result);
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});
app.get("/createaccount", (req, res) => {
  try {
    makeAccount().then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}...`);
});
