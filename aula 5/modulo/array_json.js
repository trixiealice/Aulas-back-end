/***************************************************************************************************
 * Objetivo: Manipular dados em ARRAY E JSON
 * Autor: Alice
 * Data: 05/03/26 - 11/03 - 13/03
 * Versão: 1.0 
 ***************************************************************************************************/

/*
    [ ] -> representa um objeto do tipo ARRAY
    { } -> Representa um objeto do tipo JSON

    ARRAY -> É um espaço na memória para armazenar dados sem a necessidade de criar outros objetos

        Ex: 
        let nome = 'José'
        let nome = 'Maria'
        let nome = 'João'
            
        indices(posições)     0        1       2
        let nomes =       ['José', 'Maria', 'João']

    JSON -> É um espaço na memória para armazenar dados com CHAVE e VALOR
        Ex:
            let nome        = 'José'
            let telefone    = '123456789'
            let email       = 'jose@gmail.com'

                            Atributo
                            Chave   Valor     Chave        Valor       Chave     Valor
            let cliente = ("nome": "José", "telefone": "123456789", "email": "jose@gmail.com")

*/

//Criando objetos do tipo ARRAY
const listaDeAlunos = ["José", "Maria", "Luiz", "Antônio", "Carlos"]
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function(){
    //Exibindo o tipo de dados de um indice
    console.log(typeof(listaDeAlunos[6]))

    //Mostra o array em forma de tabela, mostrando índice e conteúdo
    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])
    
    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    console.log("**********Exemplo com WHILE***************")
    //Usando o While
    let cont = 0
    while(cont<5){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont+=1
    }

    //Usando o FOR
    console.log("**********Exemplo com FOR****************")
    for(let contador = 0; contador < 5; contador++){
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    //Usando o FOR EACH
    //Método de array que me devolve o conteúdo por meio de uma função de callback
    //CALLBACK: chama a função e manda algo pra ela
    //Ele não faz repetição em Json, somente em array
    console.log("********Exemplo com FOR EACH ************")
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é: ${aluno}`)
    })

    //Usando o FOR OF
    console.log("********Exemplo com FOR OF ************")
    for (aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)
    }

    //Usando o FOR IN
    console.log("********Exemplo com FOR IN ************")
    for(aluno in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[item]}`)
    }

    //retorna a quantidade de items em um array
    console,log(listaDeAlunos.length)
}

const manipularDados = function(){
    listaDeClientes[0] = "Jose da Silva"
    listaDeClientes[1] = "Maria da Silva"
    listaDeClientes[2] = "Luiz da Silva"
    listaDeClientes[3] = "Ana da Silva"
    listaDeClientes[5] = "Beatriz da Silva"

    console.log(listaDeClientes)

    //Permite adicionar novos elementos no ARRAY, sempre no FINAL
    listaDeFornecedores.push("Antônio")
    listaDeFornecedores.push("Caio")
    listaDeFornecedores.push("Luiz")


    //Permite adicionar novos elementos no ARRAY, sempre no INICIO
    //Após adicionar o elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')
    console.log(listaDeFornecedores)

    //Permite adicionar um novo elemento em uma determinada posição do ARRAY
                      //splice (indice, qtdeDeElementos, 'Novo conteúdo)
    listaDeFornecedores.splice(3,0,'Bernardo')

    console.table(listaDeFornecedores)

    // permite remover um determinado conteudo com base no indice do
    // elemento do ARRAY    
                        //splice('indice, qtde de elementos a ser removido')
    listaDeFornecedores.splice(6,2)
    console.table(listaDeFornecedores)

    //Permite remover o último elemento do ARRAY
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover o primeiro elemento do ARRAY
    //Após ele remover, irá reorganizar todos os elementos
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

const removerNome = function(nomeAluno){
    let cont = 0 
    let qtde = listaDeAlunos.length
    

    while(cont < qtde){
        if(nomeAluno == listaDeAlunos[cont]){
            listaDeAlunos.splice(cont, 1)
        }
        cont++
    }

}

const verificarItem = function(nomeAluno){
    //verificar se o conteúdo existe dentro do ARRAY e retorna (true/false)
    return listaDeAlunos.includes(nomeAluno)
}

const manipularDadosJSON = function (){
    //Criando um objeto JSON
     //A estrutura do JSON é a Chave (atributo) : Valor (conteúdo)
    let aluno = {"id":1, "nome" :"José da Silva", "ra":123456, "email":"jose@gmail.com"}

    //Adiciona um novo atributo no JSON já existente
    aluno.telefone = "011-975845252"
    aluno.data_nascimento = "10/05/2000"

    //Exibe o objeto JSON
    console.log(aluno)

    //Exibe um atributo só, não o json inteiro
    console.log(aluno.nome)

    //Remove um atributo do JSON
    delete aluno.email
    console.log(aluno)

}

// exibirDados()

console.table(listaDeAlunos)

// manipularDados()
removerNome('José')
console.table(listaDeAlunos)
manipularDadosJSON()