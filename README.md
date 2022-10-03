# Lesson 08 Weekend Homework 

This README file holds all the reports with each function execution, transaction hash, or the revert reason, when 
interacting with the Ballot.sol contract through Deployment.ts scripts.

-- **Jesus** --
#### giveRightToVote( )
Deployed the contract to Goerli test net making my Metamask wallet account `0x470034EB47FDb4890364C23eaA16208BC5208666` the 
chairperson. I then added some code to give right to vote to another test MM wallet -> `0xfF3FAB6F41F4681bCcf05f016fa3f908C7e6ac0d`

Before calling the function I logged the `weight` value of this Address which was `0`. After calling `giveRightToVote` this value should change to `1`.

Below is a poriton of the the transaction receipt that was logged to the console.

###### rightToVoteTxReceipt
```
to: 0xa30D19A08C7565063Ce4eBd68B454D522D6D11af,
from: 0x470034EB47FDb4890364C23eaA16208BC5208666
blockHash: 0x0abb73cf0950a0dda1bef04c27da3a9ffb93f31f94fd26949596cea53debb4b0
txHash: 0x796d79ef6bd45270bc54bcaa0c153aed394b4bcf3eaac498ba8042de986ded72
```
After calling giveRightToVote the weight in Voter struct for address `0xca06eF3aE1E9902A1d5a234c84B5b98b72D22ceA` was `1`.


#### vote( )
Added code to Deployment scripts to cast a vote to proposal 0. 
Account that was msg.sender -> `0x470034EB47FDb4890364C23eaA16208BC5208666`
In the voter struct that was looged to console, the `voted` boolean attribute was set to `true`

###### tx receipt
```
to: `0x665AE15748FF12Ed9C803E484F0FB9b799bE5614`
from: `0x470034EB47FDb4890364C23eaA16208BC5208666`
blockHash: `0xa52fac75e2ea405702dddb674d05fdb9bf23c559516de4d9e33be512c2727c83`
txHash: `0x6b01e6e26686b5a0ec98360d3fac4b0f022ae75698537a318188752db8ccfa0b`
```
