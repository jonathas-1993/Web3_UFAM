// SPDX-License-Identifier: UNLICENSED

// Define a versão do compilador Solidity a ser usada
// ^0.8.28 significa "use a versão 0.8.28 ou qualquer versão mais recente dentro da série 0.8.x"
pragma solidity ^0.8.28;

// Define um contrato chamado "HelloWorld" - unidade básica de código executável na Ethereum
contract HelloWorld {
    // Declara uma variável de estado do tipo string chamada "message"
    // "public" cria automaticamente uma função getter com o mesmo nome (message())
    // A variável é inicializada com o valor "Hello World"
    // Esta variável é armazenada permanentemente no blockchain
    string public message = "Hello World";
    
    // Define uma função pública chamada "setMessage" que permite alterar o valor da variável message
    // "public" permite que qualquer endereço externo (incluindo outros contratos) chame esta função
    // "memory" indica que o parâmetro _message é temporariamente armazenado na memória durante a execução
    // Esta função requer gas para ser executada, pois modifica o estado do contrato
    function setMessage(string memory _message) public {
        // Atribui o valor do parâmetro _message à variável de estado message
        // Esta operação modifica o estado do contrato no blockchain
        message = _message;
    }
}