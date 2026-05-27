const configMessages = require('../modulo/configMessages.js')

const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')
// const {excluirFilmeGenero} = require('./controller_filme.js')

const inserirNovoFilmeGenero = async function(filmeGenero){
    // console.log(filmeGenero)
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(filmeGenero)

        if(validar){
            return validar
        }else{
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
            // console.log(result)
            if(result){

                filmeGenero.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESSES_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESSES_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESSES_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeGenero

                return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }

    } catch (error) {
        // console.log(error);
        
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeGenero = async function(filmeGenero, id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let resultBuscarID = await buscarFilmeGenero(id)

            if(resultBuscarID.status){

                let validar = await validarDados(filmeGenero)

                if(!validar){

                    filmeGenero.id = Number(id)

                    let result = await generoDAO.updateFilmeGenero(await tratarDados(filmeGenero))

                    if(result){

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero

                        return customMessage.DEFAULT_MESSAGE

                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }

            }else{
                return resultBuscarGenero
            }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarFilmeGenero = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if(result){

            if(result.length > 0){

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_genero = result

                return customMessage.DEFAULT_MESSAGE

            }else{
                return customMessage.ERROR_NOT_FOUND
            }

        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarGeneroIdFilme = async function(idFilme){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(idFilme == undefined || String(idFilme).replaceAll(' ','') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0){

            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await filmeGeneroDAO.selectGeneroByIdFilme(idFilme)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESSES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESSES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        console.log(error);
        
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFilmeGenero = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(id == undefined || String(id).replaceAll(' ','') == '' || id == null || isNaN(id) || id <= 0){

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST

        }else{

            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){

                if(result.length > 0){

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

                    return customMessage.DEFAULT_MESSAGE

                }else{
                    return customMessage.ERROR_NOT_FOUND
                }

            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarID = await buscarFilmeGenero(id)

        if(resultBuscarID.status){
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarID
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir a relação de generos com o filme
const excluirGenerosIdFilme = async function(idFilme){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

            let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

            if(result){
                return customMessage.SUCCESSES_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDados = async function(filmeGenero){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    }else{
        return false
    }
}



module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    buscarGeneroIdFilme,
    validarDados,
    excluirGenerosIdFilme
}