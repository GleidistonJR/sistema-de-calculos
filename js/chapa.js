
import { Header } from "./components/header.js"

const headerContainer = document.querySelector('#header');
headerContainer.innerHTML = Header();

import { TextCopia } from "./components/textCopia.js"

const textCopiaContainer = document.querySelector('#textCopia');
textCopiaContainer.innerHTML = TextCopia();

const material = document.getElementById('material')
const espessura = document.getElementById('espessura')
const cor = document.getElementById('cor')


const porcentagemInp = document.getElementById('porcentagem')
const valorFinal = document.getElementById('valorFinal')
const copiarOrcamento = window.document.getElementById("copiarOrcamento")

let textoOrcamento = 'teste'

const inputs = window.document.querySelectorAll(".inputs")
/*Observa todos os inputs, e se alterados chama a função "calcular" */
material.addEventListener("change", mostrarAtributos);

inputs.forEach(input => {
    input.addEventListener("change", verificarMaterial);
});


function mostrarAtributos() {
    /* Se o material for acrilico ele aparece os atributos, se não ele esconde*/
    if (material.value != 'acrilico') {
        const atributosAcrilico = document.getElementsByClassName('acrilico')

        for (let i = 0; i < atributosAcrilico.length; i++) {
            atributosAcrilico[i].style.display = 'none'
        }
    } else {
        const atributosAcrilico = document.getElementsByClassName('acrilico')

        for (let i = 0; i < atributosAcrilico.length; i++) {
            atributosAcrilico[i].style.display = 'grid'
        }
    }

    verificarMaterial()
}

function verificarMaterial() {

    switch (material.value) {
        case 'acrilico':
            calcularAcrilico()
            break;

        case 'pvc':
            monstrarValor(230)
            break;

        case 'abs':
            monstrarValor(800)
            break;

        case 'espelhado':
            monstrarValor(400)
            break;

        default:
            console.log('default')

    }

}

function calcularAcrilico() {
    let valor
    switch (espessura.value) {
        case '2':
            valor = 200
            break
        case '3':
            valor = 300
            break
        case '4':
            valor = 400
            break
        case '5':
            valor = 500
            break
        case '6':
            valor = 600
            break
        case '8':
            valor = 800
            break
        case '10':
            valor = 1000
            break
        case '12':
            valor = 1200
            break
        case '15':
            valor = 1500
            break
        case '20':
            valor = 2000
            break

        default:
            valor = 'default valor'
            break
    }

    if (cor.value == 'colorido') {
        monstrarValor(Number(valor) * 1.2)

    } else {
        monstrarValor(valor)
    }
}

function monstrarValor(valorBase) {
    /*Acrescenta a porcentagem*/
    const porcentagem = (porcentagemInp.value / 100) + 1

    valorFinal.innerHTML = (valorBase * porcentagem).toFixed(2)

    textoCopia()
}

function textoCopia() {
    textoOrcamento = `
Chapa de ${material.value} ${espessura.value} medindo 2x1 metros
OBS: Chapa inteira (Com plastico e )

R$ ${material.value} - Unidade

Tempo médio para ser produzido de 2 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`


    copiarOrcamento.dataset.texto = textoOrcamento
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
