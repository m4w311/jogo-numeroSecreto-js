// boa prática, evitar repetições de código.
//'console.log' para testar métodos
let listaDeNumerosSorteados = [];
let numeroLimite = 10 ;
let numeroSecreto = gerarNumeroAleatorio(); // guradando o numero aleatorio
let tentativas = 1 ;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número de 1 a 10');
    
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value; // 'input' entrada o usuário | value é para pegar o valor.
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1", "Você acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if ( chute > numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é menor.");
        } else {
            exibirTextoNaTela("p", " O número secreto é maior.");
        }
        //tentativas = tetntativas + 1;
        tentativas++;
        limparCampo();
    }
}   

function gerarNumeroAleatorio() { // gerarNúmeroAleatorio é o que chamamos de função
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite ) {
        listaDeNumerosSorteados = [] ;
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ //veriificando se tem o numero escolhido| dentro dos parenteses o include verifica se nos numeroEscolhidos algum já foi sorteado.
        return gerarNumeroAleatorio(); //pediremos para que um novo número seja gerado caso o número já esteja na lista.
    } else { 
        listaDeNumerosSorteados.push(numeroEscolhido); //em javascript o 'push' adiciona item ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido; // caso o numero não esteja na lista retorna o numero escolhido
    }
}           

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}   