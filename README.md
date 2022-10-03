# Lesson 08 Weekend Homework 

This README file holds all the reports with each function execution, transaction hash, or the revert reason, when 
interacting with the Ballot.sol contract through Deployment.ts scripts.

**Group Members:**

- Adrian Sandoval
- Jesus Chavez
- Arjun Mukherjee
- Micah
- Jose


-- **Jesus** --
### First function execution -> `giveRightToVote( )`

Deployed the contract to Goerli test net making my Metamask wallet account `0x470034EB47FDb4890364C23eaA16208BC5208666` the 
chairperson. I then added some code to give right to vote to another test MM wallet -> `0xfF3FAB6F41F4681bCcf05f016fa3f908C7e6ac0d`

Before calling the function I logged the `weight` value of this Address which was `0`. After calling `giveRightToVote` voter.weight was now `1`.

Below is a poriton of the the transaction receipt that was logged to the console.

###### rightToVoteTxReceipt
```
to: 0xa30D19A08C7565063Ce4eBd68B454D522D6D11af,
from: 0x470034EB47FDb4890364C23eaA16208BC5208666
blockHash: 0x0abb73cf0950a0dda1bef04c27da3a9ffb93f31f94fd26949596cea53debb4b0
txHash: 0x796d79ef6bd45270bc54bcaa0c153aed394b4bcf3eaac498ba8042de986ded72
```
After calling giveRightToVote the weight in Voter struct for address `0xca06eF3aE1E9902A1d5a234c84B5b98b72D22ceA` was `1`.


### Second function execution -> `vote( )`

Casted a vote to the first proposal in the `PROPOSALS` array by calling vote() on ballot contract and passing `0` as an argument.
msg.sender -> `0x470034EB47FDb4890364C23eaA16208BC5208666`
This executed successfully. Logged Voter struct to the console. `voted` boolean attribute was set to `true` for this address.

###### tx receipt
```
to: `0x665AE15748FF12Ed9C803E484F0FB9b799bE5614`
from: `0x470034EB47FDb4890364C23eaA16208BC5208666`
blockHash: `0xa52fac75e2ea405702dddb674d05fdb9bf23c559516de4d9e33be512c2727c83`
txHash: `0x6b01e6e26686b5a0ec98360d3fac4b0f022ae75698537a318188752db8ccfa0b`
```
-- **Adrian** --

### First function execution -> `giveRightToVote( )`

Gave the account that I will later delegate my vote to the right to vote. The function succesfully executed. 

I logged the voter struct of both the chairman and the delegate, and noted that the delegates weight increased when given the right to vote. 

###### rightToVoteTxReceipt
```
to: '0x3C2DbE9132ADD8D41ef9746B99eBae0220E80644',
from: '0xaDD95228501c0769b1047975faf93FC798C4E76C',
blockHash: '0xe310d44d7472d33423b18bea9dc6662006e6e22f49c10bd40e49b7ea20124424',
transactionHash: '0x26a97f658ccf8716da3fda0591db94e3ef63c4e7a306c3e19a117629e9827865'
```
### Second function execution -> `delegate( )`

After giving the secondary address the right to vote, I delegated my vote to that address. The function ran succesfully, and after logging the delegated accounts struct, I noticed that their weight was now 2 instead of one, but they had yet to vote. I also logged the chairperson's struct and noticed that thir hasVoted boolean was now set to true. 

###### tx receipt
```
to: '0x3C2DbE9132ADD8D41ef9746B99eBae0220E80644',
from: '0xaDD95228501c0769b1047975faf93FC798C4E76C',
blockHash: '0x461fbb993bfe08023982489d0e2a03ca3d22e7f0299359bd51a0e6dbd7e9251b',
transactionHash: '0xf1dd56d8cfe58c088bd3b63f2b90c4240ffc171ea5fa8b4e482cb2477e9152e2'
```

