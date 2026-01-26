
import { Header } from "./components/header.js"

const headerContainer = document.querySelector('#header');
headerContainer.innerHTML = Header();

import { TextCopia } from "./components/textCopia.js"

const textCopiaContainer = document.querySelector('#textCopia');
textCopiaContainer.innerHTML = TextCopia();



let textoOrcamento
let personalizacao
let corMaterial
let material

const corInput = window.document.getElementById("corChapa") ?? 0
const espessuraInput = window.document.getElementById("espessuraChapa") ?? 0

const valX = window.document.getElementById("valX") ?? 0
const valY = window.document.getElementById("valY") ?? 0


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

const tipoMaterialInput = window.document.getElementById("tipoMaterial")

const porcentagemInput = window.document.getElementById("porcentagem") ?? 0
const quantidadeInput = window.document.getElementById("quantidade")



function verificarMaterial() {
    if (tipoMaterialInput.value != 'acrilico') {

        document.querySelectorAll('.acrilicoItem')
            .forEach(el => {
                el.style.display = 'none';
            });

        corMaterial = 'padrao'
        material = tipoMaterialInput.value
        calcular()

    } else {

        document.querySelectorAll('.acrilicoItem')
            .forEach(el => {
                el.style.display = 'grid';
            });

        corMaterial = corInput.value
        material = espessuraInput.value
        calcular()
    }
}


const inputs = window.document.querySelectorAll(".inputs")


/*Observa todos os inputs, e se alterados chama a função "calcular" */
inputs.forEach(input => {
    input.addEventListener("change", verificarMaterial);
});




function calcular() {


    const valorX = Number(valX.value) / 100
    const valorY = Number(valY.value) / 100

    const metroquadrado = valorX * valorY

    const quantidade = quantidadeInput.value

    let corPorcento;

    switch (corMaterial) {
        case "cristal":
            corPorcento = 1;
            break;

        case "colorido":
            corPorcento = 1.2;
            break;

        case "padrao":
            corPorcento = 1.0;
            break;

        default:
            corPorcento = 1;
    }

    let valorMetroQuadrado;
    let speed;

    switch (material) {
        case "2":
            valorMetroQuadrado = 211;
            speed = 2.2;
            break;

        case "3":
            valorMetroQuadrado = 311.47;
            speed = 1.8;
            break;

        case "4":
            valorMetroQuadrado = 414.84;
            speed = 1.5;
            break;

        case "5":
            valorMetroQuadrado = 518.56;
            speed = 1.2;
            break;

        case "6":
            valorMetroQuadrado = 622.28;
            speed = 0.8;
            break;

        case "8":
            valorMetroQuadrado = 829.70;
            speed = 0.6;
            break;

        case "10":
            valorMetroQuadrado = 1037.12;
            speed = 0.3;
            break;

        case "12":
            valorMetroQuadrado = 1360.98;
            speed = 0.2;
            break;

        case "15":
            valorMetroQuadrado = 1701.23;
            speed = 0.1;
            break;

        case "20":
            valorMetroQuadrado = 2401.73;
            speed = 0.1;
            break;

        case "pvc":
            valorMetroQuadrado = 160;
            speed = 2.2;
            break;

        case "abs":
            valorMetroQuadrado = 800;
            speed = 2.2;
            break;
        case "espelhado":
            valorMetroQuadrado = 400;
            speed = 2.2;
            break;

        default:
            valorMetroQuadrado = 0;
            speed = 1;
    }


    let porcentagem = Number(porcentagemInput.value) / 100 + 1

    let perimetro = ((valorX * 2) + (valorY * 2)) * 100

    let tempCorte = perimetro / speed

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


    let calcVenda = (metroquadrado * valorMetroQuadrado * corPorcento + valorCorte) * porcentagem


    metroQuadradoText.innerHTML = (metroquadrado).toFixed(4)

    tempoCorteText.innerHTML = (minutosCorte + segundosCorte).toFixed(2)

    valorVendaText.innerHTML = (calcVenda).toFixed(2)







    /*---------------------------
    PERSONALIZAÇÃO
    ---------------------------*/

    let valorAreaPers

    switch (tipoPersInput.value) {
        case "branco":
            valorAreaPers = 100;
            personalizacao = "Adesivo Branco"
            break;

        case "impresso":
            valorAreaPers = 180;
            personalizacao = "Adesivo Impreso"
            break;

        case "espelhado":
            valorAreaPers = 230;
            personalizacao = "Adesivo Impresso Espelhado"
            break;

        case "fiber":
            valorAreaPers = 400;
            personalizacao = "Gravação na Fiber"
            break;

        case "uv":
            valorAreaPers = 1000;
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


    valorFinalText.innerHTML = ((calcValorPers + calcVenda) * quantidade).toFixed(2)







    /*---------------------------
    TEXTO ORÇAMENTO
    ---------------------------*/


    /* CHAPA*/
    if (calcVenda) {
        if (calcVenda && !calcValorPers) {
            if (quantidade == 1) {
                textoOrcamento = `
Acrílico ${corInput.value} ${material}mm, medindo ${valorX * 100}x${valorY * 100} centímetros
(Apenas corte)

R$ ${calcVenda.toFixed(2)} - Unidade

Tempo médio para ser produzido de 2 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`

            }
            else if (quantidade > 1) {
                textoOrcamento = `
Acrílico ${corInput.value} ${material}mm, medindo ${valorX * 100}x${valorY * 100} centímetros
(Apenas corte)

R$ ${calcVenda.toFixed(2)} - Unidade

R$ ${(Number((calcVenda).toFixed(2))* quantidade).toFixed(2)} - ${quantidade} Unidades

Tempo médio para ser produzido de 2 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
            }

        } else if (calcVenda && calcValorPers) {
            if (quantidade == 1) {
                textoOrcamento = `
Acrílico ${corInput.value} ${material}mm, medindo ${valorX * 100}x${valorY * 100} centímetros
Personalização: ${personalizacao}

R$ ${(calcVenda + calcValorPers).toFixed(2)} - Unidade

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
            }
            else if (quantidade > 1) {
                textoOrcamento = `
Acrílico ${corInput.value} ${material}mm, medindo ${valorX * 100}x${valorY * 100} centímetros
Personalização: ${personalizacao}

R$ ${(calcVenda + calcValorPers).toFixed(2)} - Unidade

R$ ${((Number(calcVenda + calcValorPers).toFixed(2))* quantidade).toFixed(2)} - ${quantidade} Unidades

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
            }
        }


    }
    /* APENAS PERSONALIZAÇÂO*/
    else if (calcValorPers) {

        if (quantidade == 1) {
            textoOrcamento = `
    Personalização em ${personalizacao} medindo ${valXPers * 100} x ${valYPers * 100}
    
R$ ${(calcValorPers).toFixed(2)} - Unidade

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
        } else if (quantidade > 1) {
            textoOrcamento = `
Personalização em ${personalizacao} medindo ${valXPers * 100} x ${valYPers * 100}
    
R$ ${(calcValorPers).toFixed(2)} - Unidade

R$ ${(Number(calcValorPers.toFixed(2))* quantidade).toFixed(2)} - ${quantidade} Unidades

Tempo médio para ser produzido de 5 dias úteis.
Para início da produção é solicitado 50% do valor antecipado e o restante no ato da retirada.
Forma de pagamento: Dinheiro, PIX ou cartão de crédito em 2x, e débito
Retirar na loja, não estamos fazendo entrega.`
        }
    }

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
