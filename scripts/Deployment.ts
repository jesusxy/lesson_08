import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const testAddr = "0xfF3FAB6F41F4681bCcf05f016fa3f908C7e6ac0d"

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

    // const accounts = await ethers.getSigners();
    // console.log("Deploying Ballot contract");
    // console.log("Proposals: ");
    // PROPOSALS.forEach((proposal, index) => {
    //     console.log(`Proposal No: ${index + 1}: ${proposal}`);
    // });
    // const ballotFactory = await ethers.getContractFactory("Ballot");
    // const ballotContract = await ballotFactory.deploy(convertStringArrayToBytes32(PROPOSALS));
    // await ballotContract.deployed();
    // console.log(`Ballot contract was deployed to the address: ${ballotContract.address}`);

    // for(let index= 0; index < PROPOSALS.length; index++){
    //     const proposal = await ballotContract.proposals(index);
    //     const name = ethers.utils.parseBytes32String(proposal.name);
    //     console.log({ index, name, proposal });
    // }

    // const chairperson = await ballotContract.chairperson();
    // console.log('Chairperson: ', {chairperson});
    // console.log('Accounts: ', {accounts0: accounts[0].address, accounts1: accounts[1].address});

    // let voterStructAddr1 = await ballotContract.voters(accounts[1].address);
    // console.log('Voter Struct Acc 1: ', {voterStructAddr1});

    // const giveRightToVote = await ballotContract.giveRightToVote(accounts[1].address);
    // const giveRightToVoteTxReceipt = await giveRightToVote.wait();
    // console.log('Give Right to Vote Receipt: ', {giveRightToVoteTxReceipt});
    // voterStructAddr1 = await ballotContract.voters(accounts[1].address);
    // console.log('Voter Struct Acc 1: ', {voterStructAddr1});

    // console.log('_____ Casting vote to a proposal 0 using Account 1 _____')
    // const castVoteTx = await ballotContract.connect(accounts[1]).vote(0);
    // const castVoteTxReceipt = await castVoteTx.wait();
    // console.log('____ Cast Vote Reeipt: ', {castVoteTxReceipt});

    // const proposal0 = await ballotContract.proposals(0);
    // const name = ethers.utils.parseBytes32String(proposal0.name);
    // console.log({ index: 0, name, proposal0 });
    // voterStructAddr1 = await ballotContract.voters(accounts[1].address);
    // console.log('Voter Struct Acc 1: ', {voterStructAddr1});

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