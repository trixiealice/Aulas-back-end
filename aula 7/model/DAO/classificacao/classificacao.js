//Import da biblioteca para manipular dados no Banco de dados MySql
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o Banco de dados Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


//Função para inserir uma nova classificação
const insertClassificacao = async function(classificacao){
    try {

        let sql = `insert into tbl_classificacao (
            sigla,
            nome,
            descricao
        ) values (
            '${classificacao.sigla}',
            '${classificacao.nome}',
            '${classificacao.descricao}'
        );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


//Função para atualizar uma classificação
const updateClassificacao = async function(classificacao){
    try {

        let sql = `update tbl_classificacao set
            sigla      = '${classificacao.sigla}',
            nome       = '${classificacao.nome}',
            descricao  = '${classificacao.descricao}'
        where id = ${classificacao.id};`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


//Função para listar todas as classificações
const selectAllClassificacao = async function(){
    try {

        let sql = 'select * from tbl_classificacao order by id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


//Função para buscar classificação por ID
const selectByIdClassificacao = async function(id){
    try {

        let sql = `select * from tbl_classificacao where id = ${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


//Função para excluir classificação
const deleteClassificacao = async function(id){
    try {

        let sql = `delete from tbl_classificacao where id = ${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}