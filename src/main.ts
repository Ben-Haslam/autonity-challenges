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
    console.log('sent transaction: ', reciept.hash)
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // loop to make the thing run forever
    while (true){
        // deploy 5 contracts
        let i = 0
        while (i < 25) {
            try {
                await deploy();
                i++;
            } catch (error) {
                console.log(error)
            }
        }
        // send 25,000 Tx
        let blocknumber = await provider.getBlockNumber();
        i = 0
        while (i < 50000) {
            let newBlocknumber = await provider.getBlockNumber();
            if (newBlocknumber > blocknumber) {
                try {
                    await sendTx();
                    blocknumber = newBlocknumber;
                    i++;
                } catch (error) {
                    console.log(error)
                }
            } else {
                await sleep(500)
            }
        }
    }
}

main();