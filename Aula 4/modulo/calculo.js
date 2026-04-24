//Exemplo de função anônima

//Função para calcular as quatro operações matemáticas

//toUpperCase() -> Rteorna uma String em MAIÚSCULO
//toLowerCase -> rteorna uma string em minúsculo



const calcular = function(numero1, numero2, operador){


    let valor1                      = Number(numero1)
    let valor2                      = Number(numero2)
    let operadorMatematico          = String(operador).toUpperCase()

    //Processamneto
  /*  if(operadorMatematico == "SOMA"){
        resultado = valor1 + valor2
    }else if(operadorMatematico == 'SUBTRAIR'){
        resultado = valor1 - valor2
    }else if(operadorMatematico == 'MULTIPLICAR'){
        resultado = valor1 * valor2
    }else if(operadorMatematico =='DIVIDIR'){
        resultado = valor1 / valor2
    }else{
        return false
    }*/



    switch(operadorMatematico) {
        case 'SOMAR':
            resultado = somar(valor1, valor2)
            break;
        case 'SUBTRAIR':
            resultado = subtrair(valor1, valor2)
        case 'MULTIPLICAR':
            resultado = valor1 * valor2
            break;
        case 'DIVIDIR':
            resultado = valor1 / valor2
            break;
    }

   //Saida
return resultado     
}

//Função baseada em formato de seta (ARROW FUNCTION)
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)

module.exports = {
    calcular,
    somar,
    subtrair,
    multiplicar,
    dividir
}

