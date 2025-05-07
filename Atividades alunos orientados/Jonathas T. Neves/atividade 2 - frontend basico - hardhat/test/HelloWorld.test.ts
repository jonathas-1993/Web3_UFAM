import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy("Hello World"); // Passa o argumento do construtor
    await helloWorld.waitForDeployment();

    return { helloWorld, owner, otherAccount };
  }

  it("Deve retornar a mensagem inicial", async function () {
    const { helloWorld } = await deployFixture();
    expect(await helloWorld.message()).to.equal("Hello World");
  });

  it("Deve atualizar a mensagem", async function () {
    const { helloWorld } = await deployFixture();
    await helloWorld.setMessage("Nova mensagem");
    expect(await helloWorld.message()).to.equal("Nova mensagem");
  });
});
