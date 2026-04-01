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

//Import da depeências para criar a API
const express = require("express")
const cors = require("cors")

//Criando um objeto de expres para criar a API
const app = express()

const corsOptions = {
    origin: [""], //Configuração de origem da requisição (API ou Donínio)
    methods: 'GET', //Configuração dos verbos que serão utilizados na API
    allowedHeaders: [`content-type`, `Autorization`]

}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//import arquivo de funções
const estadosCidades = require("./modulo/array_json.js")

app.get('/v1/senai/dadosestado/:uf', function(request, response){
    console.log(request.params.uf)
})

app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if(estado){
        response.json(estado)
        response.status(200)
    }else{
        response.json({"message": "Nenhum estado foi encontrado."})
        response.status(404)
    }
})

//Endpoint para listar os estados
app.get('/v1/senai/estados', function(request, response){
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //Requisição bem sucedida!!!
})

app.get('/v1/senai/estado/capital:uf', function(request, response){
    let 
})
app.get('/v1/senai/cidades', function(request, response){
    response.json({"mesage": "Testando a API de cidades"})
    response.status(200) //Requisição bem sucedida!!!
})

app.listen(8080, function(){
    console.log("API aguardando novas requisições...")
})