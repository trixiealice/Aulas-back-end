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
const inserirNovoFilme = async function(filme) {

    //Cria uma cópia do JSON do arquivo de configuração de mensagem
    let custoMessage = JSON.parse(JSON.stringify(configMessages))
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        custoMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'

    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        custoMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'

    }else if(filme.capa == null || filme.capa == undefined || filme.capa > 255){
        custoMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'

    }else if(filme.data.lancamento == '' || filme.data.lancamento == null || filme.data.lancamento == undefined || filme.data.lancamento.length != 10){
        custoMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMEMTO] INVÁLIDO'

    } else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        custoMessage.ERROR_BAD_REQUEST.field = '[DURACÇÃO] INVÁLIDO'

    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        custoMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'

    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3 ){
        custoMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        
    }else {
        let result = await filmeDAO.insertFilme(filme)

        if(result){
            custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCESSES_CREATED_ITEM.status
            custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCESSES_CREATED_ITEM.status_code
            custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCESSES_CREATED_ITEM.message

        }else {
            custoMessage.DEFAULT_MESSAGE.status = custoMessage.ERROR_INTERNAL_SERVER_MODEL.status
            custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.ERROR_INTERNAL_SERVER_MODEL.status_code
            custoMessage.DEFAULT_MESSAGE.message = custoMessage.ERROR_INTERNAL_SERVER_MODEL.message

        }

        return custoMessage.DEFAULT_MESSAGE
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

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
}