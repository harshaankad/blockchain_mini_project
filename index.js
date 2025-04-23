// import { MetaMaskSDK } from '@metamask/sdk';
//import {ethers} from 'ethers-5.6.esm.min.js';
//import {contractAddress,abi} from 'constants.js';

// const MMSDK = new MetaMaskSDK(options);

// const ethereum = MMSDK.getProvider();
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
//const rewardButton=document.getElementById("reward");

//rewardButton.onclick=reward;
connectButton.addEventListener("click", connect);
balanceButton.onclick = getBalance;
fundButton.addEventListener("click", fund);
withdrawButton.onclick = withdraw;



async function connect() {


    // const MMSDK = new MetaMaskSDK.MetaMaskSDK()
    // // Because init process of the MetaMaskSDK is async.
    // setTimeout(() => {
    //     const ethereum = MMSDK.getProvider() // You can also access via window.ethereum

    //     ethereum.request({ method: 'eth_requestAccounts' })
    // }, 0)
    if (typeof window.ethereum !== "undefined") {
        try { await window.ethereum.request({ method: "eth_requestAccounts" }); }
        catch (error) {
            console.log(error);
        }
        connectButton.innerHTML = "Connected";
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
    }

    //provider=ethers.provider.RPCProvider("http://192.168.0.104:8080");
    //const balance=await provider.getBalance(address);

}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance("0x27042cF21849b785011850e12895A228Baf4f998");
        const a = Math.pow(10, 18);
        alert(balance / a);
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();//This is how we are getting our account from metamask
        //console.log(`yoyo nigga`);
        const contract = new ethers.Contract("0x2bd168d110c184f65c15968b40a48bd133b1a8b3", [{ "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FundMe__NotOwner", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "MINIMUM_USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fundingAddress", "type": "address" }], "name": "getAddressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getFunder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVersion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "i_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "s_addressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "s_funders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_priceFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], signer);
        //console.log(`yoyo nigga`);
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x27042cF21849b785011850e12895A228Baf4f998", [{ "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FundMe__NotOwner", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "MINIMUM_USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fundingAddress", "type": "address" }], "name": "getAddressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getFunder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVersion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "i_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "s_addressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "s_funders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_priceFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "sendEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferEther", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], signer);

        const transactionResponse = await contract.fund({
            //console.log(`yoyo nigga`);
            value: ethers.utils.parseEther(ethAmount),
        });
        await transactionResponse.wait(1);
    }

    catch (error) {
        console.log(error);
    }

}

async function withdraw() {
    //const ethAmount=document.getElementById("ethAmount").value;
    //console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();//This is how we are getting our account from metamask
        //console.log(`yoyo nigga`);
        const contract = new ethers.Contract("0x2bd168d110c184f65c15968b40a48bd133b1a8b3", [{ "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FundMe__NotOwner", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "MINIMUM_USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fundingAddress", "type": "address" }], "name": "getAddressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getFunder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVersion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "i_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "s_addressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "s_funders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_priceFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], signer);
        //console.log(`yoyo nigga`);
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x27042cF21849b785011850e12895A228Baf4f998", [{ "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FundMe__NotOwner", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "MINIMUM_USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fundingAddress", "type": "address" }], "name": "getAddressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getFunder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVersion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "i_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "s_addressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "s_funders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_priceFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "sendEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferEther", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], signer);

        const transactionResponse = await contract.withdraw();
        await transactionResponse.wait(1);
    }

    catch (error) {
        console.log(error);
    }

}

async function reward() {
    const rewardAmount = document.getElementById("rewardAmount").value;
    console.log(`Rewarding with ${rewardAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();//This is how we are getting our account from metamask
        //console.log(`yoyo nigga`);
        //const contract=new ethers.Contract("0xE8741C5b4e25b3A4EbDA05299D7e0032F28DCc683",[{"inputs":[{"internalType":"address","name":"priceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"FundMe__NotOwner","type":"error"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"MINIMUM_USD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fund","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"fundingAddress","type":"address"}],"name":"getAddressToAmountFunded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getFunder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVersion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"i_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"s_addressToAmountFunded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"s_funders","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_priceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transferEther","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],signer);
        //console.log(`yoyo nigga`);
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
        //console.log(`yoyo nigga`);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x27042cF21849b785011850e12895A228Baf4f998", [{ "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "FundMe__NotOwner", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "MINIMUM_USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "fundingAddress", "type": "address" }], "name": "getAddressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getFunder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVersion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "i_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "s_addressToAmountFunded", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "s_funders", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_priceFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "sendEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferEther", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }], signer);
        const value = ethers.utils.parseEther(rewardAmount);
        const transactionResponse = await contract.sendEther("0xdeF97BB46D21A767417125c1d3ED767ED25dB846", value);
        await transactionResponse.wait(1);
    }

    catch (error) {
        console.log(error);
    }

}