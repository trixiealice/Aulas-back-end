const configMessages = require('../modulo/configMessages.js')

//Import do DAO
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')


//Inserir nova classificação
const inserirNovaClassificacao = async function(classificacao, contentType){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(classificacao)

            if(validar){
                return validar
            }else{

                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if(result){

                    classificacao.id = result

                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_CREATED_ITEM.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_CREATED_ITEM.status_code
                    custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCCESSES_CREATED_ITEM.message
                    custoMessage.DEFAULT_MESSAGE.response = classificacao

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


//Atualizar classificação
const atualizarClassificacao = async function(classificacao, id, contentType){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultClassificacao = await buscarClassificacao(id)

            if(resultClassificacao.status){

                let validar = await validarDados(classificacao)

                if(!validar){

                    classificacao.id = Number(id)

                    let result = await classificacaoDAO.updateClassificacao(classificacao)

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
                return resultClassificacao
            }

        }else{
            return custoMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


//Listar classificações
const listarClassificacao = async function(){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await classificacaoDAO.selectAllClassificacao()

        if(result){

            if(result.length > 0){

                custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                custoMessage.DEFAULT_MESSAGE.response.classificacao = result

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


//Buscar classificação por ID
const buscarClassificacao = async function(id){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if(id == undefined || id == '' || id == null || isNaN(id) || id <= 0){

            custoMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return custoMessage.ERROR_BAD_REQUEST

        }else{

            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if(result){

                if(result.length > 0){

                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                    custoMessage.DEFAULT_MESSAGE.response.classificacao = result

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


//Excluir classificação
const excluirClassificacao = async function(id){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultClassificacao = await buscarClassificacao(id)

        if(resultClassificacao.status){

            let result = await classificacaoDAO.deleteClassificacao(id)

            if(result){
                return custoMessage.SUCCESS_DELETED_ITEM
            }else{
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultClassificacao
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


//Validação dos dados
const validarDados = async function(classificacao){

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    if(classificacao.sigla == undefined || classificacao.sigla == '' || classificacao.sigla == null || classificacao.sigla.length > 5){

        custoMessage.ERROR_BAD_REQUEST.field = '[SIGLA] INVÁLIDA'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(classificacao.nome == undefined || classificacao.nome == '' || classificacao.nome == null || classificacao.nome.length > 45){

        custoMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    }else if(classificacao.descricao == undefined || classificacao.descricao == '' || classificacao.descricao == null || classificacao.descricao.length > 200){

        custoMessage.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
        return custoMessage.ERROR_BAD_REQUEST

    }else{
        return false
    }
}


module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}