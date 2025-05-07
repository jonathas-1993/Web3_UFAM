// scripts/deploy.js - Script para implantar o contrato HelloWorld
async function main() {
  try {
    // Obtém a conta que vai implantar o contrato
    const [deployer] = await ethers.getSigners();
    
    console.log("Implantando contrato com a conta:", deployer.address);
    console.log("Saldo da conta:", (await ethers.provider.getBalance(deployer.address)).toString());
    
    // Obtém a Factory do contrato HelloWorld
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    
    // Implanta o contrato com a mensagem inicial
    const helloWorld = await HelloWorld.deploy("Hello do Frontend!");
    
    // Aguarda a confirmação da implantação
    await helloWorld.waitForDeployment();
    
    // Obtém o endereço do contrato implantado
    const helloWorldAddress = await helloWorld.getAddress();
    
    console.log("Contrato HelloWorld implantado no endereço:", helloWorldAddress);
    console.log("-----------------------------------------------");
    console.log("Use este endereço no frontend (variável contractAddress)");
  
    // Testa o contrato chamando a função message
    const initialMessage = await helloWorld.message();
    console.log("Mensagem inicial do contrato:", initialMessage);
    
  } catch (error) {
    console.error("Erro ao implantar contrato:", error);
    process.exit(1);
  }
}

// Executa a função main e trata possíveis erros
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
