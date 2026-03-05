/*********************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Data: 05/03/26
 * Autora: Alice
 * Versão: 1.0
 ********************************************/

/*
    [ ] -> Representa um objeto do tipo ARRAY
    { } -> Representa um obejto do tipo JSON

    Array -> É um espaço na memória para armazenar dados sem a nescessidade de criar outros objetos
        Ex:
            let nome    = 'Jose'
            let nome2   = 'Maria'
            let nome3   = 'João'

            let nomes = ['Jose, 'Maria', 'João']

    JSON -> É um espaço na memória para armazenar dados com CHAVE e VALOR
        Ex:
            let nome        = 'Jose'
            let telefone    = '123456789'
            let email       = 'jose@gamil.com'

            let cliente     = {'nome: 'Jose', 'telefone': '123456789', 'email': 'jose@gmail.com'}

*/

//Criando objetos do tipo ARRAY
const listaDeAlunos     = ["Jose", "Maria", "Luiz", "Antonio", "Carlos"] 
const listaDeClientes   = []
const listaDeFornecedores   = []


const exibirDados = function (){




    console.log(listaDeAlunos)
    
    //mostra o ARRAY em forma de tabela, mostrando INDICE e CONTEÚDO
    console.table(listaDeAlunos)

    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)


    //Usando While
    console.log('\n******* Exemplo com While ********')
    let cont = 0
    while(cont<5){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont+=1
    }

    //Usando o FOR
    console.log('\n******* Exemplo com FOR *******')
    for(let contador = 0; contador <5; contador++){
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    //Usando FOR EACH
    console.log('\n******* Exemplo com FOR EACH *******')
    listaDeAlunos.forEach(function(item){
        console.log(`O nome do aluno é: ${item}`)
    })


    //Usando FOR OF
    console.log('\n ******* Exemplo com FOR OF*******')
    for (aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)
    }

    //Usando FOR IN
    console.log('\n ******* Exemplo com FOR IN *******')
    for (let item in listaDeAlunos) {
        console.log(`O índice do aluno é: ${item}`)
    }

    //Retorna a quantidade de item em um ARRAY
    console.log(listaDeAlunos.length)
    
}

const manipularDados = function(){
    listaDeClientes[0] = "José da Silva"
    listaDeClientes[1] = "Maria da Silva"
    listaDeClientes[2] = "Luiz da Silva"
    listaDeClientes[3] = "Ana da Silva"
    listaDeClientes[5] = "Beatriz da Silva"

    console.log(listaDeClientes)
    
    //Permite adiconar nvos elementos no ARRAY sempre no FINAL
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'Jose', 'Andre')

}

exibirDados()
