import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const testAddr = "0xca06eF3aE1E9902A1d5a234c84B5b98b72D22ceA"
const CHAIRMAN_ADDRESS = "0xaDD95228501c0769b1047975faf93FC798C4E76C";
const DELEGATE_ADDRESS = "0x7717Bd9b2eF9bE48968a19728c8D71789634728C";

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main() {
    const signer = await initWallet();

    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS));
    await ballotContract.deployed();

    // give right to vote
    const rightToVote = await ballotContract.giveRightToVote(testAddr);
    const rightToVoteReceipt = await rightToVote.wait();
    console.log('Give Right to Vote Receipt: ', {rightToVoteReceipt});
    const voterStructAddr1 = await ballotContract.voters(testAddr);
    console.log('Voter struct Test Addr: ', voterStructAddr1.weight.toString());

    // cast a vote to proposal 0
    const castVoteTx = await ballotContract.vote(0);
    const castVoteTxReceipt = await castVoteTx.wait();
    console.log('___ Cast Vote Receipt ____', {castVoteTxReceipt});
    // voter struct testAddr
    const voterStructAddr2 = await ballotContract.voters(signer.address);
    console.log('Voter struct Test Addr: ', {voterStructAddr2});
    
    // ADRIAN'S CODE
    let voterStructForDelegate = await ballotContract.voters(DELEGATE_ADDRESS);
    console.log({voterStructForDelegate});

    const giveRightToVoteTxAdrian = await ballotContract.giveRightToVote(DELEGATE_ADDRESS);
    const giveRightToVoteTxAdrianReceipt = await giveRightToVoteTx.wait();
    console.log({giveRightToVoteTxReceipt});

    const delegateVoteTx = await ballotContract.delegate(DELEGATE_ADDRESS);
    const delegateVoteTxReceipt = await delegateVoteTx.wait();
    console.log({delegateVoteTxReceipt});

    voterStructForDelegate = await ballotContract.voters(DELEGATE_ADDRESS);
    console.log({voterStructForDelegate});
    
    
    
}

async function initWallet() {
    const options = {
      alchemy: process.env.ALCHEMY_API_KEY,
      infura: process.env.INFURA_API_KEY
    }
    const provider = ethers.getDefaultProvider("goerli", options);

    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    console.log(`Using wallet address: ${wallet.address}`);
    const signer = wallet.connect(provider);

    return signer;
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
});
