/*****************************************************************************
 * Obejtivo: Arquivo responsável pela criação da API do projeto Estados e Cidades
 * Data: 01/04/26
 * Autor: Alice
 * Versão 1.0
*****************************************************************************/

/***************
 * Para configurar a API
 * Instalar o EXPRESS -> npm install express --save
 *      Depenência para confugurar e utilizr protocolo HTTP para criar API
 * 
 * Instalar o CORS      -> npm install cors --save
 *      Dependência para configurar as permissões de acesso a API
 * 
 * 
 * 
***************/

//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações do cors da API
const cosrsOptions = {
    origin : ['*'],  //Configuração de origem da requisição (IP ou o dominio)
    methods: 'GET', //Configuração dos metodos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization']   //Configurações de permissoes
                    //Tipode de dados   Autorização de acesso

}

//Aplica as configurações do cors no app (Express)
app.use(cors(cosrsOptions))

const estadosCidades = require('./modulo/array_json.js')

//endpoint para listar os estados (como detalhar a API na url /v1/senai/estados)
app.get('/v1/senai/estados', function(request, response){
    let estados = estadosCidades.getListaDeEstados()
    if(estados){
    response.json(estados)
    response.status(200)} //requisição bem sucedida
    else{
        response.json({'message': "Algo deu errado"})
        response.status(400)
    }
})



app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({'message': "Algo deu errado"})
        response.status(400)
    }
})

app.get('/v1/senai/dados/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstado(sigla)
    if(capitalEstado){
        response.json(capitalEstado)
        response.status(200)
    }else{
        response.json({'message': "Algo deu errado"})
        response.status(400)
    }
})

app.get('/v1/senai/dados/estado/regiao/:uf', function(request, response){
    let regiao = request.params.uf
    let estadoRegiao = estadosCidades.getEstadoRegiao(regiao)
    if(estadoRegiao){
        response.json(estadoRegiao)
        response.status(200)
    }else{
        response.json({'message': "Algo deu errado"})
        response.status(400)
    }
})


app.get('/v1/senai/dados/capitais/pais', function(request, response){
    let capitalPais = estadosCidades.getCapitalPais()
    if(capitalPais){
    response.json(capitalPais)
    response.status(200)} //requisição bem sucedida
    else{response.json({'message': "Algo deu errado"})
    response.status(400)}
})


app.get('/v1/senai/dados/cidades/:uf', function(request, response){
    let sigla = request.params.uf
    let cidade = estadosCidades.getCidades(sigla)
    if(cidade){
        response.json(cidade)
        response.status(200)
    }else{
        response.json({"message" : 'Algo deu erado'})
        response.status(400)
    }
})

app.get('/v1/senai/help', function(request, response){
    let docAPI = {
        "api-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-02-24",
        "development": "Alice Campos da Silva",
        "version": 1.0,
        "endpoints": [
            {
                "rota1"    : "v1/senai/estados",
                "description"   :   "Retorna a lista de todos os estados"
            },
            {
                "rota2"    : "v1/senai/dados/estados/sp",
                "description"   :   "Retorna dados de um estado filtrando pela sigla"
            },
            {
                "rota3"    : "v1/senai/dados/capital/estados/sp",
                "description"   :   "Retorna dados da capital de um estado filtrando pela sigla"
            },
            {
                "rota4"    : "v1/senai/dados/estados/regiao/sul",
                "description"   :   "Retorna a lista doa estados filtrando pela região"
            },
            {
                "rota5"    : "v1/senai/dados/estados/capitais/brasil",
                "description"   :   "Retorna a lista de todos os estados que ja foram capitais do brasil"
            },
            {
                "rota6"    : "v1/senai/dados/cidades/estados/sp",
                "description"   :   "Retorna a lista de cidades filtrando pela sigla do estado"
            }
        ]
    }
})


//Fazer o start na API(aguardando as requisições)
app.listen(3030, function(){
    console.log('API aguaradando novas requisições ...')
})