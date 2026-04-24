/************************************************************************
* Objetivo: Projeto para realizar o calculo de médias escolares
* Autor: Alice
* Data: 29/01/2026
* Versão: 1.0
************************************************************************/

/*

    Tipos de criação de variáveis

    var -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação hoje é considerada a amais antiga,
            é provavel que seja encontrada apenas em projetos mais antigos.
            dica: caso você precise utilizar o var, recomenda-se que seja
            utilzado apenas em escopo global.


    let -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é realizada som,ente no escopo
            local, ou seja, dentro de bloco de programação {}
            Esse tipo de variável deixa de existir ao termino do bloco.

    const -> Permite criar espaços em memória, do tipo consytante, ou seja
            esse conteúdo não poderá sofrer mudanças durante o projeto.
            dica: Se possível, vêce pode cirar essa const escrita em MAIÚSCULO
            para facilitar a sua utilização. Pode ser criado de forma local ou global.

    Operadores de comparação

==    Permite comparar dois valores (compara apenas o conteúdo)
===   Permite comparar dois valores, verificando o conteúdo e o tipo de dado
!=    Permite verificar se dois valores são diferentes (apenas o conteúdo)
!==   Permite verificar se dois valores são diferentes, considerando o conteúdo
e o tipo de dado

<     Permite verificar se um valor é menor que outro
>     Permite verificar se um valor é maior que outro
<=    Permite verificar se um valor é menor ou igual a outro
>=    Permite verificar se um valor é maior ou igual a outro

&&    Operador lógico AND (retorna verdadeiro se **todas** as condições forem verdadeiras)
||    Operador lógico OR (retorna verdadeiro se **pelo menos uma** condição for verdadeira)
!     Operador lógico NOT (inverte o valor lógico)

Formas de conversão de tipos de dados
    parseInt()      permite converter um conteúdo em número de tipo INTEIRO
    parseFloat()    permite converter um conteúdo em número de tipo DECIMAL
    Number()        Permite converter um conteúdo para NUMERO, podendo ser inteiro ou decimal
    String ()       permite converter um coteúdo em string
    Boolean()       Permite converter um conteúdo para Booleano (True or False)

    typeof()        Retorna o tipod de dados de uma variável (String, Number, Boolean ou Object)

*/

//Import da biblioteca e entrada de dados
const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada de dados nome
entradaDeDados.question('Digite o nome do aluno: ', function(nome){
    //Recebe o nome do aluno
    let nomeAluno = nome

    entradaDeDados.question('Digite a nota 1: ', function(valor1){
        let nota1 = valor1

        entradaDeDados.question('Digite a nota 2: ', function(Valor2){
            let nota2 = Valor2

            entradaDeDados.question('Digite a nota 3: ', function(Valor3){
                let nota3 = Valor3
                
                entradaDeDados.question('Digite a nota 4: ', function(Valor4){
                    let nota4 = Valor4
                    
                    if(nomeAluno == '' || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == '' ){
                        console.log(`ERRO: EXISTEM CAMPOS OBRIGATÓRIOS QUE NÃO FORAM PREENCHIDOS!!!`)

                    }else if (nota1 < 0 || nota2 < 0 || nota3 < 0 || nota4 < 0){
                        console.log('ERRO: SOMENTE SÃO PERMITIDOS NÚMEROS ENTRE 0 E 100')

                    }else if (nota1 >= 101 || nota2 >= 101 || nota3 >= 101 || nota4 >= 101){
                        console.log('ERRO: SOMENTE SÃO PERMITIDOS NÚMEROS ENTRE 0 E 100')

                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                    console.log('SOMENTE SÃO PERMITIDOS NÚMEROS NAS NOTAS')
                    }else {

                    let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4))/4
                    //toFixed() é um métdoo que permite quantidade de casas decimais
                    console.log(`O aluno(a) ${nomeAluno} teve a média final de ${media.toFixed(2)}`)

                    /* (DEU ERADO) if (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)/4 >= 70){
                        console.log('APROVADO')
                    } else if (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)/4  >= 50 < 70){
                        console.log('RECUPERAÇÃO')
                    } else if (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)/4 < 50){
                        console.log('REPROVADO')
                    }}*/

                    if (media >= 70) {
                        console.log('SITUAÇÃO: APROVADO(A) !!!')
                    } else if (media >= 50 && media <=70) {
                        console.log('SITUAÇÃO: RECUPERAÇÃO !!!')
                    } else if (media < 50) {
                        console.log('SITUAÇÃO: REPROVADO(A) !!!')
                    }

                    //console.log(`ALUNO: ${nomeAluno} \nMÉDIA FINAL: ${media.toFind(2)} \n STATUS DE APROVAÇÂO: ${statusAluno}`)
                }

                }) //Fecha nota 4
            }) // Fecha nota 3
        }) //Fecha nota 2
    }) //Fecha nota 1
}) //Fecha nome
