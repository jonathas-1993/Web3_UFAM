import fs from "fs";
import hre from "hardhat";

export async function deployDynamicContract(messageText) {
  const contractSource = `
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.28;
    contract DynamicMessage {
        string public message = "${messageText}";
        function setMessage(string memory _message) public {
            message = _message;
        }
    }
  `;

  const contractFile = "./contracts/DynamicMessage.sol";
  fs.writeFileSync(contractFile, contractSource);

  await hre.run("compile");

  const factory = await hre.ethers.getContractFactory("DynamicMessage");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const tx = contract.deploymentTransaction();
  const receipt = await tx.wait();

  return {
    contractAddress: contract.target,
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    timestamp: new Date().toLocaleTimeString(),
    message: messageText,
  };
}
