/*****************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento de dados, manipulção de dados para realizar um CRUD de filme
 * Data: 17/04/2026
 * Autora: Alice
 * Versão 1.0
 ****************************************************/

const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do filme do Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Import das Controllers
const controllerClassificacao = require("../classificacao/controller.classificacao.js")
const controllerFilmeGenero = require("./controller_filme_genero.js")

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    //Cria uma cópia do JSON do arquivo de configuração de mensagem
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função para validar a entrada de dados do  filme
            let validar = await validarDados(filme)

            //Retorna um JSON de erro caso algum atributo seja invalido, se não retorna um false(não teve erro)
            if (validar) {
                return validar //400
            } else {

                //Encaminha os dados do filme para o DAO inserir no Banco de Dados
                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                // console.log(result)
                if (result) { //201

                    //Cria o ID no JSON do filme e adicona o Id gerado no DAO
                    filme.id = result

                    //Percorre o array de generos que chegará na requisição pelo objeto filme
                    //Manipulação de dados para Inserir os Generos relacionados ao filme
                    for (itemFilme of filme.genero) {
                        let genero = {
                            "id_filme": filme.id,
                            "id_genero": itemFilme.id
                        }


                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(genero)
                     
                        
                        if (!resultFilmeGenero.status) {
                            return custoMessage.SUCCESSES_CREATED_ITEM_WARNING //201 com alerta de cadastro
                        }

                    }
                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_CREATED_ITEM.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_CREATED_ITEM.status_code
                    custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCCESSES_CREATED_ITEM.message
                    custoMessage.DEFAULT_MESSAGE.response = filme

                    // console.log(custoMessage.DEFAULT_MESSAGE);
                    

                    return custoMessage.DEFAULT_MESSAGE //201
                } else { //erro 500 (Model)
                    return custoMessage.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return custoMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função pra atualizar um filme existente
const atualizarFilme = async function (filme, id, contentType) {
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarFilme = await buscarFilme(id)
           
            if (resultBuscarFilme.status) {
                let validar = await validarDados(filme)

                if (!validar) {

                    //Adiciona um atributo id no JSON de filme, para enviar ao BD um único objeto
                    filme.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await filmeDAO.updateFilme(filme)

                    if (result) {

                        //Excluir as relações entre o filme os generos (Tabela de Relação)
                        let resultDeleteGeneros = await controllerFilmeGenero.excluirGenerosIdFilme(filme.id)
                        
                        if(resultDeleteGeneros.status){

                            for (itemFilme of filme.genero) {
                                let genero = {
                                    "id_filme": filme.id,
                                    "id_genero": itemFilme.id
                                }
        
        
                                let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(genero)
                             
                                
                                if (!resultFilmeGenero.status) {
                                    return custoMessage.SUCCESSES_CREATED_ITEM_WARNING //201 com alerta de cadastro
                                }
        
                            }
                        }

                        custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESS_UPDATE_ITEM.status
                        custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_CREATED_ITEM.status_code
                        custoMessage.DEFAULT_MESSAGE.message = custoMessage.SUCCESSES_CREATED_ITEM.message
                        custoMessage.DEFAULT_MESSAGE.response = filme


                        return custoMessage.DEFAULT_MESSAGE
                    } else {
                        return custoMessage.ERROR_INTERNAL_SERVER_MODEL //500 model
                    }
                } else {
                    return validar //400 de validação dos campos do banco de dados
                }
            } else {
                return resultBuscarFilme //400(ID inválido) ou 404(não encontrado)
            }
        } else {
            return custoMessage.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)

    }


}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()


        //Validação para verificar se o DAO conseguiu processar o script no BD
        if (result) {
            //Valiação para verificar se o conteúdo do array tem dados de retorno ou se está vazio
            if (result.length > 0) {

                //Manipulação dos dados de Classificação
                //Percorre o array de filmes
                for (filme of result) {
                    //Busca na conytroller da classificação o ID refrerente a FC da classificação
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                    //Se encontrar o ID
                    if (resultClassificacao.status) {
                        //Adiciona um atributo classificação no JSON de filme e colocar o resultado com os dados de classficação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }

                    //

                    let resultGenero = await controllerFilmeGenero.buscarGeneroIdFilme(filme.id)
                    
                    if (resultGenero.status) {
                        filme.genero = resultGenero.response.filme_genero
                    }
                }

                custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                custoMessage.DEFAULT_MESSAGE.response.count = result.length
                custoMessage.DEFAULT_MESSAGE.response.filme = result

                // console.log(custoMessage.DEFAULT_MESSAGE)

                return custoMessage.DEFAULT_MESSAGE
            } else {
                return custoMessage.ERROR_NOT_FOUND //404
            }
        } else {
            return custoMessage.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }

    } catch (error) {
        
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function (id) {
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Validação para garanti que o ID seja um número válido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            custoMessage.ERROR_BAD_REQUEST.field == '[ID] INVÁLIDO'
            return custoMessage.ERROR_BAD_REQUEST //400
        } else {

            //Chama a função do DAO para pesquisar o filme pelo iD
            let result = await filmeDAO.selectByIdFilme(id)
            
            //Validação para verificar se o DAO verificou dados ou FALSE(erro)
            if (result) {

                //Validação para verificar se o DAO tem algum dado no Array
                if (result.length > 0) {

                    for (filme of result) {

                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                        if (resultClassificacao.status) {

                            filme.classificacao = resultClassificacao.response.classificacao
                            delete filme.id_classificacao
                        }
                        else{
                            return resultClassificacao
                        }
                        
                        let resultGeneros = await controllerFilmeGenero.buscarGeneroIdFilme(filme.id)
                        
                        if (resultGeneros.status) {
                            filme.genero = resultGeneros.response.filme_genero
                        }
                        else{
                            return resultGeneros
                        }

                    }
                    custoMessage.DEFAULT_MESSAGE.status = custoMessage.SUCCESSES_RESPONSE.status
                    custoMessage.DEFAULT_MESSAGE.status_code = custoMessage.SUCCESSES_RESPONSE.status_code
                    custoMessage.DEFAULT_MESSAGE.response.filme = result

                    return custoMessage.DEFAULT_MESSAGE //200
                } else {
                    return custoMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }
    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER // (controler)
    }
}

//Função para excluir um filme
const excluirFilme = async function (id) {

    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Chama a função de bsucar filme para validar se filme existe
        let resultBuscarFilme = await buscarFilme(id)

        //Validação
        if (resultBuscarFilme.status) {

            //Chama a função do DAO para excluir o filme
            let result = await filmeDAO.deleteFilme(id)

            if (result)
                return custoMessage.SUCCESS_DELETED_ITEM //200 ou 204
            else
                return custoMessage.ERROR_INTERNAL_SERVER_MODEL //200 ou 204
        } else {
            return resultBuscarFilme //400 ou 404
        }
    } catch (error) {
        return custoMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controller
    }

}

const validarDados = async function (filme) {

    //Cria uma cópia do JSON do arquivo de configuração de mensagem
    let custoMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80) {
        custoMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        custoMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.capa == null || filme.capa == undefined || filme.capa > 255) {
        custoMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        custoMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMEMTO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        custoMessage.ERROR_BAD_REQUEST.field = '[DURACÇÃO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        custoMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        custoMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST

    } else if (filme.id_classificacao == undefined || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0) {
        custoMessage.ERROR_BAD_REQUEST.field = '[ID_CLASSIFICACAO] INVÁLIDO'
        return custoMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (filme) {
    filme.nome = filme.nome.replaceAll("'", "")
    filme.sinopse = filme.sinopse.replaceAll("'", "")
    filme.capa = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao = filme.duracao.replaceAll("'", "")
    filme.valor = filme.valor.replaceAll("'", "")
    filme.avaliacao = filme.avaliacao.replaceAll("'", "")
    return filme
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    tratarDados
}