/*****************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento de dados, manipulção de dados para realizar um CRUD de filme
 * Data: 17/04/2026
 * Autora: Alice
 * Versão 1.0
 ****************************************************/

const configMessages = require('../modulo/configMessages.js') 

//Import do arquivo do DAO para manipular os dados do filme do Banco de Dados
const filmeDAO = require ('../../model/DAO/filme/filme.js')

//Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType) {

    //Cria uma cópia do JSON do arquivo de configuração de mensagem
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

    if(String(contentType).toUpperCase() == 'APLICATION/JSON'){
    //Chama a função para validar a entrada de dados do  filme
    let validar = await validarDados(filme)

    //Retorna um JSON de erro caso algum atributo seja invalido, se não retorna um false(não teve erro)
    if(validar) {
        return validar //400
    }else {

        //Encaminha os dados do filme para o DAO inserir no Banco de Dados
        let result = await filmeDAO.insertFilme(filme)
        
        // console.log(result)
            if(result){ //201
                custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCESSES_CREATED_ITEM.status
                custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCESSES_CREATED_ITEM.status_code
                custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCESSES_CREATED_ITEM.message

                return custoMessage.DEFAULT_MESSAGE //201
            }else { //erro 500 (Model)
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }else{
        return custoMessage.ERROR_CONTENT_TYPE
    }

        } catch (error) {
           return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

//Função pra atualizar um filme existente
const atualizarFilme = async function() {
    
}

//Função para retornar todos os filmes existentes
const listarFilme = async function() {
    
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function() {
    
}

//Função para excluir um filme
const excluirFilme = async function() {
    
}

//Cria uma cópia do JSON do arquivo de configuração de mensagem
let custoMessage = JSON.parse(JSON.stringify(configMessages))

const validarDados = async function(filme) {
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        custoMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        custoMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(filme.capa == null || filme.capa == undefined || filme.capa > 255){
        custoMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        custoMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMEMTO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        custoMessage.ERROR_BAD_REQUEST.field = '[DURACÇÃO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        custoMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){
        custoMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST
    }else{
        return false 
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
}