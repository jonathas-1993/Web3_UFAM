// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;

    // Construtor que define a mensagem inicial
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    // Função para obter a mensagem atual
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Função para atualizar a mensagem
    function setMessage(string memory newMessage) public {
        message = newMessage;  // Modificando a variável `message` sem redeclarar
    }
}