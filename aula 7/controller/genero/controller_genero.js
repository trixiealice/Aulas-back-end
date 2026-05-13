const configMessages = require('../modulo/configMessages.js') 

//Import do arquivo do DAO para manipular os dados do filme do Banco de Dados
const generoDAO = require ('../../model/DAO/genero/genero.js')

const inserirNovoGenero = async function(genero, contentType){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(genero)
            if(validar){
                return validar
            }else{
                let result = await generoDAO.insertGenero(genero)
                if (result) {

                    genero.id = result

                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_CREATED_ITEM.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_CREATED_ITEM.status_code
                    custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCCESSES_CREATED_ITEM.message
                    custoMessage.DEFAULT_MESSAGE.response = genero

                    return custoMessage.DEFAULT_MESSAGE
                }else{
                    return custoMessage.ERROR_INTERNAL_SERVER_MODEL
                }

            }
        }else{
            return custoMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarGenero = async function(genero, id, contentType){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarGenero = await buscarGenero(id)

            if(resultBuscarGenero.status){

                let validar = await validarDados(genero)

                if(!validar){

                    genero.id = Number(id)
                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESS_UPDATE_ITEM.status
                        custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESS_UPDATE_ITEM.status_code
                        custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCCESS_UPDATE_ITEM.message

                        return custoMessage.DEFAULT_MESSAGE

                    }else{
                        return custoMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarGenero
            }
        }else{
            return custoMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarGenero = async function(id) {
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined ||
           id == '' ||
           id == null ||
           isNaN(id) ||
           id <= 0){

            custoMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return custoMessage.ERROR_BAD_REQUEST

        }else{
            let result = await generoDAO.selectByIdGenero(id)
            if(result){

                if(result.length > 0){

                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                    custoMessage.DEFAULT_MESSAGE.response.genero = result

                    return custoMessage.DEFAULT_MESSAGE

                }else{
                    return custoMessage.ERROR_NOT_FOUND
                }
            }else{
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarGenero = async function () {

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await generoDAO.selectAllGenero()

        if(result){
            if(result.length > 0){

                custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                custoMessage.DEFAULT_MESSAGE.response.generos = result

                return custoMessage.DEFAULT_MESSAGE

            }else{
                return custoMessage.ERROR_NOT_FOUND
            }

        }else{
            return custoMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirGenero = async function (id) {
    
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarGenero = await buscarGenero(id)

        if(resultBuscarGenero.status){

            let result = await generoDAO.deleteGenero(id)

            if(result){
                return custoMessage.SUCCESS_DELETED_ITEM
            }else{
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarGenero
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const validardados = async function (genero) {

    let custoMessage = JSON.parse(JSON.stringify(configMessages))
    
        if(genero.nome == undefined ||
           genero.nome == '' ||
           genero.nome == null ||
           genero.nome.length > 30){
    
            custoMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
            return custoMessage.ERROR_BAD_REQUEST
    
        }else if(genero.descricao == undefined ||
                 genero.descricao == '' ||
                 genero.descricao == null ||
                 genero.descricao.length > 250){
    
            custoMessage.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
            return custoMessage.ERROR_BAD_REQUEST
    
        }else{
            return false
        }

}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    excluirGenero,
    validardados
}
