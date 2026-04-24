/***************************************
 * Objetivo: Arquivo responsavel pelo CRUD de dados de filme no banco de dados my SQL
 * Data: 15/04/2026
 * Autora: Alice Campos
 * Versão 1.0
****************************************/

//Import da biblioteca para manipular dados no Banco de dados MySql
const knex = require ('knex')

//Import do arquivo de configuração para acesso ao banco dados
const knexDatabaseConfig = require ('../../database_config/knexConfig.js')

//Criar a conexão com o Banco de dados Mysql conforme o arquivo de cofiguração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir um novo filme no banco de dados
const insertFilme = async function(filme){
    try {
        
    let sql = `insert into tbl_filme (
				nome, 
                sinopse,
                capa,
                data_lancamento,
                duracao,
                valor,
                avaliacao
) values (
	'${filme.nome}',
    '${filme.sinopse}',
    '${filme.capa}',
    '${filme.data_lancamento}',
    '${filme.duracao}',
    '${filme.valor}',
    if ('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
);`

//console.log(sql)

//Encaminha para o banco de dados o scriptSQL
let result = await knexConection.raw(sql)


    //Se der certo retorna verdaeiro, se der errado retorna falso
    if(result)
        return true
    else
        return false

    } catch (error) {
        return false
}

}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function() {
    
}

//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function (filme) {
    try {

        //Script sql para listar todos os filmes
        let sql = 'select * from tbl_filme order by id desc'

        //execurta no banco de dados e script  eguarda o retorno do banco, pode ser um ERRO (false) ou um ARRAY com os dados
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do banco de dados é ARRAY ou um boolean(false)
        if(Array.isArray(result)){
            return result[0] //Retorna somente o indice com a lista de filmes
        }else {
            return false
        }
    } catch (error) {
        return false
        
    }
}

selectAllFilme()

//Função para retornar um filme filtrando pelo ID
const selectByIdFilme = async function(id){

    try {
        let sql = `select * from tbl_filme where id = ${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
    }

//Função para excluir um filme filtrando pelo ID 
const deleteFilme = async function(id){

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme,
}