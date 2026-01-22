import { Header } from "./components/header.js"

const headerContainer = document.querySelector('#header');
headerContainer.innerHTML = Header();

import { TextCopia } from "./components/textCopia.js"

const textCopiaContainer = document.querySelector('#textCopia');
textCopiaContainer.innerHTML = TextCopia();


let valorChapa = 0
let valorPers = 0

let textoOrcamento
let personalizacao

const corInput = window.document.getElementById("corChapa")
const espessuraInput = window.document.getElementById("espessuraChapa")
const valX = window.document.getElementById("valX")
const valY = window.document.getElementById("valY")
const valZ = window.document.getElementById("valZ")
const porcentagemInput = window.document.getElementById("porcentagem")

const metroQuadradoText = window.document.getElementById("metroquadrado")
const tempoCorteText = window.document.getElementById("tempoCorte")
const valorVendaText = window.document.getElementById("valorvenda")

const valorFinalText = window.document.getElementById("valorFinal")
const copiarOrcamento = window.document.getElementById("copiarOrcamento")


const tipoPersInput = window.document.getElementById("tipoPers")
const valXPersInput = window.document.getElementById("valXPers")
const valYPersInput = window.document.getElementById("valYPers")

const areaPersText = window.document.getElementById("areaPers")
const valorVendaPersText = window.document.getElementById("valorVendaPers")


corInput.addEventListener("change", () => {
    calcular()
});

espessuraInput.addEventListener("change", () => {
    calcular()
});

valX.addEventListener("change", () => {
    calcular()
});

valY.addEventListener("change", () => {
    calcular()
});

valZ.addEventListener("change", () => {
    calcular()
});

porcentagemInput.addEventListener("change", () => {
    calcular()
});



tipoPersInput.addEventListener("change", () => {
    calcular()
});
valXPersInput.addEventListener("change", () => {
    calcular()
});
valYPersInput.addEventListener("change", () => {
    calcular()
});


function calcular() {


    let corPorcento;

    switch (corInput.value) {
        case "cristal":
            corPorcento = 1;
            break;

        case "colorido":
            corPorcento = 1.2;
            break;

        default:
            corPorcento = 1;
    }

    let espessura;
    let speed;

    switch (espessuraInput.value) {
        case "2":
            espessura = 211;
            speed = 2.2;
            break;

        case "3":
            espessura = 311.47;
            speed = 1.8;
            break;

        case "4":
            espessura = 414.84;
            speed = 1.5;
            break;

        case "5":
            espessura = 518.56;
            speed = 1.2;
            break;

        case "6":
            espessura = 622.28;
            speed = 0.8;
            break;

        case "8":
            espessura = 829.70;
            speed = 0.6;
            break;

        case "10":
            espessura = 1037.12;
            speed = 0.3;
            break;

        case "12":
            espessura = 1360.98;
            speed = 0.2;
            break;

        case "15":
            espessura = 1701.23;
            speed = 0.1;
            break;

        case "20":
            espessura = 2401.73;
            speed = 0.1;
            break;

        default:
            espessura = 0;
            speed = 1;
    }


    const valorX = Number(valX.value) / 100
    const valorY = Number(valY.value) / 100
    const valorZ = Number(valZ.value) / 100

    const metroquadrado = ((valorX * valorY) * 2) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2)


    let perimetro = ((valorX * 8) + (valorY * 8) + (valorZ * 8)) * 100

    let tempCorte = perimetro / speed

    let porcentagem = Number(porcentagemInput.value) / 100 + 1

    let minutosCorte = Math.floor(tempCorte / 60)

    let segundosCorte = (tempCorte % 60 / 100)

    let valorCorte 
    
     if (minutosCorte == 0 && segundosCorte > 0) {
        valorCorte = 3
    } else if (minutosCorte == 0 && segundosCorte == 0) {
        valorCorte = 0
    }
    else {
        valorCorte = (minutosCorte + 1) * 3
    }


    let calcVenda = (metroquadrado * espessura * corPorcento + valorCorte) * porcentagem


    metroQuadradoText.innerHTML = (metroquadrado).toFixed(4)

    tempoCorteText.innerHTML = (minutosCorte + segundosCorte).toFixed(2)

    valorVendaText.innerHTML = (calcVenda).toFixed(2)


    let valorAreaPers

    switch (tipoPersInput.value) {
        case "branco":
            valorAreaPers = 100;
            personalizacao = "Adesivo Branco"
            break;

        case "impresso":
            valorAreaPers = 180;
            personalizacao = "Adesivo Impresso"
            break;

        case "espelhado":
            valorAreaPers = 230;
            personalizacao = "Adesivo Impresso Espelhado"
            break;

        case "fiber":
            valorAreaPers = 200;
            personalizacao = "Gravação na Fiber"
            break;

        case "uv":
            valorAreaPers = 800;
            personalizacao = "Impressão (UV Alta definição)"
            break;

        default:
            valorAreaPers = 0;
            personalizacao = "Adesivo Impresso Espelhado"
    }

    let valXPers = Number(valXPersInput.value) / 100
    let valYPers = Number(valYPersInput.value) / 100

    let areaPers = valXPers * valYPers

    let calcValorPers = (areaPers * valorAreaPers) * porcentagem

    areaPersText.innerHTML = (areaPers).toFixed(4)

    valorVendaPersText.innerHTML = (calcValorPers).toFixed(2)

    valorFinalText.innerHTML = (calcValorPers + calcVenda).toFixed(2)







    /*---------------------------
    TEXTO ORÇAMENTO
    ---------------------------*/



    if (calcVenda != 0 && calcValorPers == 0) {

        textoOrcamento = `
Caixa em acrílico ${corInput.value} ${espessuraInput.value}mm, medindo ${valorX * 100}x${valorY * 100}x${valorZ * 100} (LxAxP) centímetros
Contem: Tampa modelo de encaixe

R$ ${calcVenda.toFixed(2)} - Unidade

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`

    } else if (calcVenda != 0 && calcValorPers != 0) {

        textoOrcamento = `
Caixa em acrílico ${corInput.value} ${espessuraInput.value}mm, medindo ${valorX * 100}x${valorY * 100}x${valorZ * 100} (LxAxP) centímetros
Contem: Tampa modelo de encaixe
Personalização: ${personalizacao}

R$ ${(calcVenda + calcValorPers).toFixed(2)} - Unidade

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
    }

    copiarOrcamento.dataset.texto = textoOrcamento
}



/*-------------------------------------
COPIAS
-------------------------------------------*/

document.querySelectorAll(".btn-copiar").forEach(botao => {
    botao.addEventListener("click", () => {
        const texto = botao.dataset.texto.trim();

        navigator.clipboard.writeText(texto)
    });
});
