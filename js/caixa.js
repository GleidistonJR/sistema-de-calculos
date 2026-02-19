import { Header } from "./components/header.js"

const headerContainer = document.querySelector('#header');
headerContainer.innerHTML = Header();

import { TextCopia } from "./components/textCopia.js"

const textCopiaContainer = document.querySelector('#textCopia');
textCopiaContainer.innerHTML = TextCopia();


const corInput = window.document.getElementById("corChapa")
const espessuraInput = window.document.getElementById("espessuraChapa")
const valX = window.document.getElementById("valX")
const valY = window.document.getElementById("valY")
const valZ = window.document.getElementById("valZ")



const areaChapaText = window.document.getElementById("metroquadrado")
const tempoCorteText = window.document.getElementById("tempoCorte")
const valorVendaText = window.document.getElementById("valorvenda")

const valorFinalText = window.document.getElementById("valorFinal")
const copiarOrcamento = window.document.getElementById("copiarOrcamento")


const tipoPersInput = window.document.getElementById("tipoPers")
const valXPersInput = window.document.getElementById("valXPers")
const valYPersInput = window.document.getElementById("valYPers")

const areaPersText = window.document.getElementById("areaPers")
const valorVendaPersText = window.document.getElementById("valorVendaPers")

const porcentagemInput = window.document.getElementById("porcentagem")
const quantidadeInput = window.document.getElementById("quantidade")

const inputs = window.document.querySelectorAll(".inputs")


/*Observa todos os inputs, e se alterados chama a função "calcular" */
inputs.forEach(input => {
    input.addEventListener("change", calcular);
});

let valorX
let valorY
let valorZ

let valorVenda
let valorTotalVenda

let tipoTampa
let quantidade

let valorPers 

let textoOrcamento
let personalizacao

function calcular() {

    tipoTampa = window.document.querySelector('input[name="tipoTampa"]:checked').value

    quantidade = quantidadeInput.value

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


    valorX = Number(valX.value) / 100
    valorY = Number(valY.value) / 100
    valorZ = Number(valZ.value) / 100

    let metroQuadradoChapa
    let perimetroCorte

    if (tipoTampa == 'semTampa') {
        /*este calculo e para Sem tampa*/
        metroQuadradoChapa = ((valorX * valorY) * 1) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2)
        perimetroCorte = ((valorX * 6) + (valorY * 6) + (valorZ * 8)) * 100
    }
    else if (tipoTampa == 'tampaLacrada') {

        /*este calculo e para caixa lacrada*/
        metroQuadradoChapa = ((valorX * valorY) * 2) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2)
        perimetroCorte = ((valorX * 8) + (valorY * 8) + (valorZ * 8)) * 100

    } else if (tipoTampa == 'tampa3cm' && valorX) {
        /*este calculo e para caixa com tampa de 3cm                                                     Adiciona mais as abas latereais de 3cm*/
        metroQuadradoChapa = ((valorX * valorY) * 2) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2) + ((valorX * 0.03) * 2) + ((valorY * 0.03) * 2)
        perimetroCorte = ((valorX * 12) + (valorY * 12) + (valorZ * 8) + (0.03 * 8)) * 100

    } else {
        /*este calculo e para caixa com tampa total                                                     Adiciona mais as abas latereais totais*/
        metroQuadradoChapa = ((valorX * valorY) * 2) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2) + ((valorX * valorZ) * 2) + ((valorY * valorZ) * 2)
        perimetroCorte = ((valorX * 12) + (valorY * 12) + (valorZ * 16)) * 100
    }


    let tempCorte = perimetroCorte / speed

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


    let valorMaterial = (metroQuadradoChapa * espessura * corPorcento + valorCorte) * porcentagem


    areaChapaText.innerHTML = (metroQuadradoChapa).toFixed(4)

    tempoCorteText.innerHTML = (minutosCorte + segundosCorte).toFixed(2)

    valorVendaText.innerHTML = (valorMaterial).toFixed(2)


    /*------------------------------------
    PERSONALIZAÇÃO
    ------------------------------------*/

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
            personalizacao = "Impressão UV (Alta definição)"
            break;

        default:
            valorAreaPers = 0;
            personalizacao = "Adesivo Impresso Espelhado"
    }

    let valXPers = Number(valXPersInput.value) / 100
    let valYPers = Number(valYPersInput.value) / 100

    let metroQuadradoPers = valXPers * valYPers

    valorPers = (metroQuadradoPers * valorAreaPers) * porcentagem

    areaPersText.innerHTML = (metroQuadradoPers).toFixed(4)

    valorVendaPersText.innerHTML = (valorPers).toFixed(2)

    valorVenda = valorPers + valorMaterial
    valorTotalVenda = (valorPers + valorMaterial) * quantidade

    valorFinalText.innerHTML = (valorTotalVenda).toFixed(2)



    textoCopia();

}


function textoCopia() {
    let descricaoMaterial = ``;
    let descricaoPersonalizacao = ``;
    let descricaoQuantidade = ``;


    if (tipoTampa == 'semTampa') {
        descricaoMaterial += `Modelo sem tampa`;
    }
    else if (tipoTampa == 'tampaLacrada') {
        descricaoMaterial += `Modelo tampa lacrada`;

    } else if (tipoTampa == 'tampa3cm' && valorX) {
        descricaoMaterial += `Modelo encaixe com abas de 3cm `;

    } else {
        descricaoMaterial += `Modelo encaixe com abas na medida total da altura`;
    }
    if (valorPers > 0) {
        descricaoPersonalizacao = `Personalização: ${personalizacao} \n`;
    }
    if (quantidade > 1) {
        descricaoQuantidade = `\nR$ ${(valorTotalVenda).toFixed(2)} - ${quantidade} Unidades\n`;
    }

    textoOrcamento = `
Caixa em acrílico ${corInput.value + ' ' + espessuraInput.value}mm, medindo ${(valorX * 100).toFixed(2)} x ${(valorY * 100).toFixed(2)} x ${(valorZ * 100).toFixed(2)} (LxAxP) centímetros
OBS: ${descricaoMaterial}
${descricaoPersonalizacao}
R$ ${(valorVenda).toFixed(2)} - Unidade
${descricaoQuantidade}
Tempo médio para ser produzido de 5 dias úteis.
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
