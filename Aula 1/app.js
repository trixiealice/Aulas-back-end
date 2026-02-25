//Comentário em virgula

/* 
Comentário
        em
    bloco
    ctrl+c para qualquer comando no terminal
*/

//permite exibir um conteúdo no terminal
console.log("testando o JS") 

//Permite a criação de uma variável
var nome = "Alice"

//Duas formas de usar a variável nome 
console.log(nome)
console.log(`O nome do usuário é: ` + nome)
console.log(`O nome do usuário é: ${nome}`) 

//Import da bibliotecla do read line
//readline -> serve para permitir a etrada de dados via terminal
var readline = require (`readline`)

//Cria um objeto especialista em entrada de daos pelo terminal

var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//PERMITE A ENTRADA DE DADOS DO NOME DE USUÁRIO
//Question -> Utilizada uma função de CALLBACK para devolvver o valor digitado
/*CALLBACK -> É uma função particular de um método, que é chamado para encaminhar um conteúdo para o
desenvolvedor, esse conteúdo vem através da variavel no argumento "nome usuário" */
entradaDeDados.question(`Digite seu nome: `, function(nomeUsuario){
    console.log (`O nome digitado foi: ` + nomeUsuario)

    entradaDeDados.question(`Digite seu email: `, function(emailUsuario){
        console.log(`O email do usuário ${nomeUsuario} é: ${emailUsuario}`)
    
    })
})