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
    )`
    
    } catch (error) {
        
    }
}

const selectAllGenero = async function(genero) {
    
}
const updateGenero = async function(genero){

}

const deleteGenero = async function (genero) {
  
}