const listaDeEstados = require("./estados_cidades")

const getListaDeEstados = function () {
    let listaUF = []
  
    listaDeEstados.estados.forEach(function (estado) {
      listaUF.push(estado.sigla)
    })
  
    return {
      uf: listaUF,
      quantidade: listaUF.length
    }
  }

const getDadosEstado = function (uf) {
    let resultado 
  
    listaDeEstados.estados.forEach(function (estado) {
      if (estado.sigla == uf.toUpperCase()) {
        delete estado.cidades
        resultado = estado
      }
    })
  
    return resultado
}

const getCapitalEstado = function (uf) {
    let resultado 
  
    listaDeEstados.estados.forEach(function (estado) {
      if (estado.sigla == uf.toUpperCase()) {
        resultado = {
          uf: estado.sigla, 
          descricao: estado.nome,
          capital: estado.capital
        }
      }
    })
  
    return resultado
}

const getEstadosRegiao = function (regiao) {
    let estadosRegiao = []
  
    listaDeEstados.estados.forEach(function (estado) {
      if (estado.regiao.toLowerCase() == regiao.toLowerCase()) {
        estadosRegiao.push({
          uf: estado.nome,
          descricao: estado.nome
        })
      }
    })
  
    return {
      regiao: regiao.toUpperCase(),
      estados: estadosRegiao
    }
  }
  
  const getCapitaisPais = function (){
     const capitais = []

      listaDeEstados.estados.forEach(function(estado){
        if (estado.capital_pais){
        capitais.push ({
          capital_atual: estado.capital_pais.capital,
          uf: estado.sigla,
          descricao: estado.nome,
          capital: estado.capital,
          regiao: estado.regiao,
          capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
          capital_pais_ano_termino: estado.capital_pais.ano_fim 

        })
      }  
    })
    return {
      capitais:
      capitais
    }
  }

  function getCidades(siglaEstado){
    let cidades = []
    let estadoSelecionado

    listaDeEstados.estados.forEach(function(estado){
      if (String(siglaEstado).toUpperCase()==String(estado.sigla).toUpperCase()){
      estadoSelecionado = estado
      }
    })

    estadoSelecionado.cidades.forEach(function(cidade){
      cidades.push(cidade.nome)
    })

    return {
      uf: estadoSelecionado.sigla,
      descricao: estadoSelecionado.nome,
      quantidade_cidades: cidades.length,
      cidades: cidades

    }
  }



// console.log("Teste lista de estados:")
// console.log(getListaDeEstados())
  
// console.log("\nTeste dados do estado:")
// console.log(getDadosEstado('SP'))
  
// console.log("\nTeste capital:")
// console.log(getCapitalEstado('SP'))
  
// console.log("\nTeste por região:")
// console.log(getEstadosRegiao('Sul'))

console.log("Teste capitais pais")
console.log(getCapitaisPais())

console.log("Teste Cidades")
console.log(getCidades("AC"))

module.exports = {
  getCapitaisPais,
  getCapitalEstado,
  getCidades,
  getListaDeEstados,
  getEstadosRegiao,
  getDadosEstado
}