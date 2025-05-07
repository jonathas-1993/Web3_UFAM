// Importa a função loadFixture que permite reutilizar a configuração de teste, evitando reimplantar contratos em cada teste
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// Importa a biblioteca de asserções 'expect' do Chai para realizar verificações nos testes
import { expect } from "chai";
// Importa o ambiente de execução do Hardhat (Hardhat Runtime Environment) para acessar a infraestrutura de blockchain
import hre from "hardhat";

// Define um grupo de testes chamado "HelloWorld"
describe("HelloWorld", function () {
  // Define uma função de fixture (configuração reutilizável) que implanta o contrato e retorna objetos necessários para os testes
  async function deployFixture() {
    // Obtém os signers (contas Ethereum) do ambiente Hardhat
    // owner: conta principal que implantará o contrato
    // otherAccount: outra conta para testar interações de diferentes usuários
    const [owner, otherAccount] = await hre.ethers.getSigners();
    
    // Obtém a factory do contrato "HelloWorld" - é um objeto que ajuda a implantar instâncias do contrato
    const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
    
    // Implanta uma nova instância do contrato HelloWorld na blockchain local
    const helloWorld = await HelloWorld.deploy();

    // Aguarda a confirmação da implantação do contrato na blockchain
    // Isso garante que o contrato esteja disponível antes de executar os testes
    await helloWorld.waitForDeployment();

    // Retorna os objetos que serão usados nos testes: o contrato implantado e as contas
    return { helloWorld, owner, otherAccount };
  }

  // Define um subgrupo de testes específicos para verificar o comportamento na implantação
  describe("Deployment", function () {
    // Define um caso de teste para verificar se a mensagem inicial está correta
    it("Deve ter a mensagem inicial correta", async function () {
      // Utiliza a fixture para obter uma instância limpa do contrato para este teste
      // Isso evita que testes anteriores interfiram no estado do contrato
      const { helloWorld } = await loadFixture(deployFixture);
      
      // Chama a função message() do contrato para obter a mensagem armazenada
      // Verifica se a mensagem é igual a "Hello World" usando a função expect do Chai
      expect(await helloWorld.message()).to.equal("Hello World");
    });

    // Define um caso de teste para verificar se é possível atualizar a mensagem
    it("Deve permitir a atualização da mensagem", async function () {
      // Utiliza a fixture para obter uma instância limpa do contrato
      const { helloWorld } = await loadFixture(deployFixture);
      
      // Chama a função setMessage do contrato para alterar a mensagem para "Olá, Mundo!"
      // Esta é uma transação que modifica o estado da blockchain
      await helloWorld.setMessage("Olá, Mundo!");
      
      // Verifica se a mensagem foi realmente atualizada, chamando a função message()
      // e comparando o resultado com o valor esperado
      expect(await helloWorld.message()).to.equal("Olá, Mundo!");
    });
  });
});