const knex = require ('knex')

const knexDatabaseConfig = require ('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function(genero) {
    try {
        let sql = `insert into tbl_genero (

                    nome,
                    descricao
    ) values (
    '${genero.nome}',
    '${genero.descricao}'
    );`

    let result = await knexConection.raw(sql)

    if (result) {
        return result[0].insertId
    } else 
        return false

    } catch (error) {
        return false
    }
}

const selectAllGenero = async function(genero) {
    try {
        let sql = 'select * from tbl_genero order id desc'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else {
            return false
        }
    } catch (error) {
        return false
    } 
}

const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set
        nome    = '${genero.nome}'
        descricao = '${genero.descricao}'
        where id = ${genero.id};`

        let result = await knexConection.raw(sql)

        if(result)
            true
        else
            false
        
    } catch (error) {
        return false 
    }
}

const deleteGenero = async function (genero) {
    try {
        let sql = `delete from tbl_genero where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else 
        return false
    } catch (error) {
        
    }
}

const selectByIdGenero = async function (genero) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}
