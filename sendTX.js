async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x31538042Dec8dB6dB951088c7d747074c8B7d0A2' //TODO: replace this address with your own public address
    const computed = '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049';

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0xcded4644e025e9792352cee1b31f410adb7c9fc6', // faucet address to return eth
     'value': 4,
     'gas': 30000,
     'maxFeePerGas': 100000000108,
     'nonce': nonce,
     'data': computed,
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();