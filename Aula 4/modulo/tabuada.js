/********************
 * Objetivo: Arquivo responsável por geral uma tabuada utilizando WHILE e FOR
 * Data: 25/02
 * Autor: Alice
 * versão: 1.0
 *******************/

//Import da biblioteca das operações matemáticas
const calculosMatematicos = require('./calculo.js')

//Função para imprimri tabuada com WHILE
const gerarTabuadaWhile = function(tabuada){
    let tab = Number(tabuada)
    let cont = 0
    let resultado 

while(cont <= 10){
//Processamento
    resultado = calculosMatematicos.multiplicar(tab, cont)
    console.log(tab + 'x' + cont + '=' + resultado)
    
    //cont = cont +1
    //cont ++
    cont +=1 //(cont recebe ele mesmo + 1, é a exemplificação da primeira linha paar não repetir palavras)
}

}
gerarTabuadaWhile(2)



//Função para imprimri tabuada com FOR
const gerarTabuadaFor = function(tabuada){
    let tab = Number(tabuada)
    let resultado 

    for(let cont = 0; cont <=10; cont++){
    //Processamento
    resultado = calculosMatematicos.multiplicar(tab, cont)
    console.log(tab + 'x' + cont + '=' + resultado)
    }

}

gerarTabuadaFor(3)