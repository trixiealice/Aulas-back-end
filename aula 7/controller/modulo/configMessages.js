/*****************************************************
 * Obejtivo: Arquivo reponsável pela padronização das mensagens e status code do projeto de filmes
 * Data: 17/04/2026
 * Autora: Alice
 * Versão: 1.0
 ****************************************************/

//Padronização dos retornos da API (Cabeçalho)
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar o projeto de filmes',
    development: 'Alice Campos da Silva',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagens de erros do projeto de filmes
const ERROR_BAD_REQUEST = {status: false, status_code: 400, message: 'Não foi possível processar a requisição devido a erros de entrada de dados'}

const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição devido a um erro interno no servidor [MODEL]'}

//Mensagens de sucesso do projeto de filmes
const SUCESSES_CREATED_ITEM = {status: true, status_code: 201, message: 'Item inserido com suceeso!'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCESSES_CREATED_ITEM,
}