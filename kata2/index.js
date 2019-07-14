const revRoman = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
const numRom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
const numAra = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];


function toRoman(num){
    var romano = '';
    for (var i = 0; i < numRom.length; i++){
        while (num >= numAra[i]){
            romano += numRom[i];
            num -= numAra[i];
        }
    }
    return romano;
}

function toArabe(numeroRomano){
    var validador = new RegExp ("^([IVXLCDM])+$");
    validador.test(numeroRomano);
    if(validador.test(numeroRomano) === false){
        return 'Numero incorrecto';
    }
    var arabe = 0;
    var caracter = numeroRomano.split('');
    for(i = caracter.length - 1;i >= 0; i--){
        var valor = revRoman[caracter[i]];
        var valorPrevio = revRoman[caracter[i + 1]];
        if(valorPrevio && valor < valorPrevio){
            arabe -= valor;
        }
        else{
            arabe += valor;
        }
    }
    return arabe
}
console.log(toRoman(3876));
console.log(toArabe('MMMDCCCLXXVS'));