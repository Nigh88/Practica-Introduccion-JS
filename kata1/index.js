function change(num){
    var word = '';
    var numero = (num +'').split('');

    if (num > 0 && num <= 100){
        if (num % 3 === 0 && num % 5 !== 0 && num % 7 !==0){
            word += "Foo";
        }
        else if (num % 5 === 0 && num % 3 !== 0 && num % 7 !== 0){
            word += "Bar";
        }
        else if (num % 7 === 0 && num % 3 !== 0 && num % 5 !== 0){ 
            word += "Quix";
        }
        else if(num % 3 === 0 && num % 5 === 0){
            word += "FooBar";
        }
        else if(num % 3 === 0 && num % 7 === 0){
            word += "FooQuix";
        }
        else if(num % 5 === 0 && num % 7 === 0){
            word += "BarQuix";
        }
        
        for(var i =0; i < numero.length; i++){
            if(numero[i] === '3'){
                word += 'Foo';
            }
            else if(numero[i] === '5'){
                word += 'Bar';
            }
            else if(numero[i] === '7'){
                word += 'Quix';
            }
        }
        // Devuelvo numero, si no hay resultados anteriores
        if(word === ''){
            word += num;
        }
    }
    return word;
}

console.log(change(67));
