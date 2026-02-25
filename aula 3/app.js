/**********
 * Objetivo: Criar uma aplicação que realiza calculo Juros utilizando funções para modulizar o o código
 * 11/02/2026
 * Versão 1.0
 * 
 */

//Import da biblioteca do readline
const readline = require("readline")

//Criando o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada do nome do cliente
entradaDeDados.question("Digite o nome do Cliente: ", function(nome){
    let nomeCliente = nome

    //Entrada do nome do produto
    entradaDeDados.question("Digite o nome do produto: ", function(produto){
        let nomeProduto = produto

        //Entrada do valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function(valor){
            let valorCompra = valor

            //Entrada da taxa de juros
            entradaDeDados.question("Digite a taxa de juros: ", function(taxa){
                let taxaJuros = taxa

                //Entrada da quantidade de parcelas
                entradaDeDados.question("Digite a quantidade de parcelas: ", function(parcelas){
                    //Import da biblioteca de calculos financeiros
                    let calculos = require("./modulo/calculos.js")
                    let qtdeParcelas = parcelas

                    //Chama a função para calcular o valor do montante
                    let montante = calculos.calcularJurosCompostos(valorCompra, taxaJuros, qtdeParcelas)

                    //Validação para verificar se o cálculo foi realizado
                    if(montante){
                        console.log("O valor final é: " + montante.toFixed(2))
                    }else{
                        console.log("ERRO: Não foi possível processar o calculo.")
                        entradaDeDados.close
                    }
                })
            })
        })
    })
})
