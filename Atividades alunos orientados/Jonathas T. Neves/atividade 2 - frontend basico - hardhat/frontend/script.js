const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // atualize se mudar

const abi = [
  "function message() view returns (string)",
  "function setMessage(string newMessage)"
];

let provider;
let signer;
let contract;

// Mapeia nomes legíveis para redes
const networkNames = {
  "hardhat": "Local Hardhat",
  "goerli": "Testnet Goerli",
  "sepolia": "Testnet Sepolia",
  "mainnet": "Ethereum Mainnet"
};

// Conectar carteira
async function connectWallet() {
  try {
    document.getElementById("walletStatus").className = "connecting";
    document.getElementById("walletStatus").innerText = "Conectando...";
    
    if (!window.ethereum) {
      alert("MetaMask não encontrada.");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = address;
    document.getElementById("walletStatus").className = "connected";
    document.getElementById("walletStatus").innerText = "Conectado";

    contract = new ethers.Contract(contractAddress, abi, signer);
    updateMessage(); // mostra a mensagem atual ao conectar
  } catch (err) {
    console.error("Erro ao conectar:", err);
    document.getElementById("walletStatus").className = "not-connected";
    document.getElementById("walletStatus").innerText = "Desconectado";
  }
}

// Atualiza nome da rede no texto ao trocar no select
document.getElementById("networkSelect").addEventListener("change", () => {
  const select = document.getElementById("networkSelect");
  const name = networkNames[select.value] || select.value;
  document.getElementById("networkName").innerText = name;
});

// Atualiza a mensagem atual do contrato
async function updateMessage() {
  try {
    const currentMsg = await contract.message();
    document.getElementById("currentMessage").innerText = currentMsg;
  } catch (err) {
    console.error("Erro ao ler mensagem:", err);
  }
}

// Enviar nova mensagem via contrato
document.getElementById("setMessageButton").addEventListener("click", async () => {
  const input = document.getElementById("newMessageInput");
  const newMessage = input.value.trim();
  if (!newMessage || !contract) return;

  try {
    const tx = await contract.setMessage(newMessage);
    const receipt = await tx.wait();

    // Atualiza interface
    updateMessage();
    appendTransaction(tx.hash, receipt.blockNumber, newMessage);
    input.value = "";
  } catch (err) {
    console.error("Erro ao enviar transação:", err);
  }
});

// Consultar a mensagem (botão de leitura)
document.getElementById("getMessageButton").addEventListener("click", () => {
  updateMessage();
});

// Exibe transações abaixo do contrato
function appendTransaction(txHash, blockNumber, message) {
  const txList = document.getElementById("txList");

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="tx-info">
      <div class="tx-hash">TX: ${txHash}</div>
      <div class="tx-details">
        <div>Bloco: ${blockNumber}</div>
        <div>Hora: ${new Date().toLocaleTimeString()}</div>
      </div>
      <div class="tx-message">Mensagem: ${message}</div>
    </div>
  `;

  txList.prepend(li);
}

// Botão conectar carteira
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);

// Inicializa o nome da rede na interface
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("networkSelect");
  document.getElementById("networkName").innerText = networkNames[select.value];
});