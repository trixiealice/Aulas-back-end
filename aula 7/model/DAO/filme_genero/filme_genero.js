const knex = require ('knex')

const knexDatabaseConfig = require ('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeGenero = async function(filmeGenero){
    try {

        let sql = `insert into tbl_filme_genero (
            nome,
            descricao
        ) values (
            ${filmeGenero.id_filme},
            ${filmeGenero.id_genero}
        );`

        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function() {
    try {
        let sql = 'select * from tbl_filme_genero order id desc'

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

const updateFilmeGenero = async function(filmeGenero){
    try {
        let sql = `update tbl_filme_genero set
        id_filme    = ${filmeGenero.id_filme}
        id_genero = ${FilmeGenero.id_genero}

        where id = ${filmeGenero.id};`

        let result = await knexConection.raw(sql)

        if(result)
            true
        else
            false
        
    } catch (error) {
        return false 
    }
}

const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else 
        return false
    } catch (error) {
        
    }
}

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) 
            return result[0]
         else
            return false
        
    } catch (error) {
        return false
    }
}

//Função para retornar os dados genero filtrando pelo id do filme
const selectGeneroByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_genero.*
                    from tbl_filme
                    inner join tbl_filme_genero
                    on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                    on tbl_genero.id = tbl_filme_genero.id_genero
                    inner join tbl_filme_ator
                    on tbl_filme.id = tbl_filme_ator.id_filme
                    inner join tbl_ator
                    on tbl_ator.id = tbl_filme_ator.id_ator
                    where id = ${idFilme}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) 
            return result[0]
         else
            return false
        
    } catch (error) {
        return false
    }
}

//Função para retornar os dados genero filtrando pelo id do filme
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = ` select tbl_filme.*
                    from tbl_filme
                    inner join tbl_filme_genero
                    on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                    on tbl_genero.id = tbl_filme_genero.id_genero

                    where id = ${idGenero}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) 
            return result[0]
         else
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectGeneroByIdFilme,
    selectFilmesByIdGenero
}
