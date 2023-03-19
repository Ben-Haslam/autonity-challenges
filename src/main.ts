import { ethers } from "ethers";
import * as fs from 'fs';

const configJson = fs.readFileSync("config.json")
const config = JSON.parse(String(configJson))

const provider = new ethers.providers.JsonRpcProvider(config.RPC)
const prvKey: string = config.privateKey;
const wallet = new ethers.Wallet(prvKey, provider);

const rawJson = fs.readFileSync("./ABI/ERC20.json")
const erc20Json = JSON.parse(String(rawJson))

async function deploy() {
    const factory = new ethers.ContractFactory(erc20Json.abi, erc20Json.bytecode, wallet)
    const contract = await factory.deploy("£BBH", "BBH", 18)
    console.log('deployed contract: ', contract.address)
}

async function sendTx() {
    const reciept = await wallet.sendTransaction({ to: config.recipient, value: "0" })
    console.log(reciept.hash)
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // deploy 5 contracts
    for (let i = 0; i < 5; i++) {
        await deploy();
    }
    // send 25,000 Tx
    let blocknumber = await provider.getBlockNumber();
    let i = 0
    while (i < 25000) {
        let newBlocknumber = await provider.getBlockNumber();
        if (newBlocknumber > blocknumber) {
            await sendTx();
            blocknumber = newBlocknumber;
            i++;
        } else {
            await sleep(500)
        }
    }
}

main();