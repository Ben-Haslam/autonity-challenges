import { ethers } from "ethers";
import fs = require('fs');
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

deploy()