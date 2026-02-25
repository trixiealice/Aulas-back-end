/***************
 * Objetivo: Arquivo responsável pelas funções de calculos
 * Data: 11/02/2026
 * 1.0
 * 
 */

//Função para retornar o percentual de um número
function calcularPercentual(numero){
    //Recebe o numero encaminhado
    let numeroPercentual = Number(numero)

    // Validação de entrada vazia, menor ou igual a zero e de caracter
    if(numero == "" || numero <=0 || isNaN(numero)){
        return false
    }else{
        //Calcula o percentual do número
        let percentual = numeroPercentual / 100
        return Number(percentual.toFixed(2))
    }

}

//Função para retornar o montante referente a juros compostos
function calcularJurosCompostos(valor, taxa, parcelas){
    //Recebe os valores dos argumentos e converte em numero
    let valorPrincipal  = Number(valor)
    let taxaJuros       = Number(taxa)
    let qtdeParcelas    = Number(parcelas)

    //Validação de vazio ou de caracteres
    if(valor == ""|| isNaN(valor) || valor <= 0 || parcelas == ""||isNaN(parcelas)|| parcelas <= 0){
        return false
    }else{
        let percentual = calcularPercentual(taxaJuros)
        if(percentual){
            //Calculo
            let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
            return Number(montante.toFixed(2))
        }else{
            return false
        }
    }
}


//Tornando as funções publicas, para que os outros arquivos possam utilizar
module.exports = {
    calcularPercentual, calcularJurosCompostos
}