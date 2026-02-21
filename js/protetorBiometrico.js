
import { Header } from "./components/header.js"

const headerContainer = document.querySelector('#header');
headerContainer.innerHTML = Header();

import { TextCopia } from "./components/textCopia.js"

const textCopiaContainer = document.querySelector('#textCopia');
textCopiaContainer.innerHTML = TextCopia();


const espessura = document.getElementById('espessura')
const cor = document.getElementById('cor')
const valX = window.document.getElementById("valX")
const valY = window.document.getElementById("valY")
const valZ = window.document.getElementById("valZ")


const protetorSol = document.querySelector('[name="protetorSol"]')
const fundofalso = document.querySelector('[name="fundoFalso"]')
const embutido = document.querySelector('[name="embutido"]')
const cantosDobrados = document.querySelector('[name="cantosDobrados"]')

const porcentagemInp = document.getElementById('porcentagem')
const valorFinalText = document.getElementById('valorFinal')
const btnCopiarOrcamento = window.document.getElementById("copiarOrcamento")

let textoOrcamento = ''
let valorVendaFinal = 0

let valorX
let valorY
let valorZ


protetorSol.addEventListener("change", () =>  desmarcar(cantosDobrados))
cantosDobrados.addEventListener("change", () =>  desmarcar(protetorSol))
fundofalso.addEventListener("change", () =>  desmarcar(embutido))

embutido.addEventListener("change", () =>  marcar(fundofalso))

function desmarcar(desmarcar) {
    desmarcar.checked = false
    calcularAcrilico()
}
function marcar(marcar) {
    marcar.checked = true
    calcularAcrilico()
}


const inputs = window.document.querySelectorAll(".inputs")

/*Observa todos os inputs, e se alterados chama a função "calcular" */
inputs.forEach(input => {
    input.addEventListener("change", calcularAcrilico);
});



function calcularAcrilico() {
    let valor
    switch (espessura.value) {
        case '4':
            valor = 430
            break
        case '5':
            valor = 530
            break

        default:
            valor = 'default valor'
            break
    }

    if (cor.value == 'preto' || cor.value == 'branco') {
        monstrarValor(Number(valor) * 1.2)

    } else {
        monstrarValor(valor)
    }
}

function monstrarValor(valorBase) {

    valorX = Number(valX.value) / 100
    valorY = Number(valY.value) / 100
    valorZ = Number(valZ.value) / 100

    let valorAdicional = 0

    let fundo = valorX * valorY

    let tampaRemovivel = 0
    if (fundofalso.checked) {
        tampaRemovivel = fundo * 1.2
    }
    if (embutido.checked) {

        let valorEmbutido = fundo * valorBase

        if (valorEmbutido < 50) { valorEmbutido = 50 }
        if (valorEmbutido > 100) { valorEmbutido = 100 }

        valorAdicional += valorEmbutido
    }
    if (cantosDobrados.checked) {
        valorAdicional += 20
    }

    let laterais = (valorY * valorZ) * 2
    let tampas = (valorX * valorZ) * 2

    let materialArea = fundo + tampaRemovivel + laterais + tampas

    let valorMaterialArea = materialArea * valorBase


    /*Acrescenta a porcentagem*/
    const porcentagem = (porcentagemInp.value / 100) + 1

    valorVendaFinal = (valorMaterialArea * porcentagem) + valorAdicional
    valorFinalText.innerHTML = (valorVendaFinal).toFixed(2)

    textoCopia()
}

function textoCopia() {
    let observacao = ``

    textoOrcamento = `
Protetor biométrico em acrilico ${cor.value} ${espessura.value}mm, medindo ${(valorX * 100).toFixed(2)} x ${(valorY * 100).toFixed(2)} x ${(valorZ * 100).toFixed(2)} (LxAxP)
OBS: ${observacao}

R$ ${(valorVendaFinal).toFixed(2)} - Unidade

Temos a pronta entrega
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`


    btnCopiarOrcamento.dataset.texto = textoOrcamento
}



/*-------------------------------------
COPIAS
-------------------------------------------*/

document.querySelectorAll(".btn-copiar").forEach(botao => {
    botao.addEventListener("click", () => {
        const texto = botao.dataset.texto.trim();
        copiarTexto(texto);
    });
});

function copiarTexto(texto) {
    const textArea = document.createElement("textarea");
    textArea.value = texto;

    // Garante que o elemento não seja visível mas esteja no DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        const sucesso = document.execCommand('copy');
        if (sucesso) {
            console.log("Copiado (via fallback HTTP)!");
        }
    } catch (err) {
        console.error("Falha Crítica ao copiar:", err);
    }

    document.body.removeChild(textArea);
}
