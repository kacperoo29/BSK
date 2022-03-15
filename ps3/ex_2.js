function matrix_cipher_a(text, key){
    let array_of_key = key.split("-");
    let text_into_array = text.split("");
    return matrix_cipher(text_into_array, array_of_key);
}
function matrix_cipher(text_into_array, array_of_key){
    let ciphered = [];
    for( let i = 0 ; i < text_into_array.length ; i += array_of_key.length ){
        for( let j = 0 ; j < array_of_key.length ; ++j ){
            let key_index = parseInt(array_of_key[ j ] ) - 1; 
            if( i + key_index  < text_into_array.length )
                ciphered.push( text_into_array[ i + key_index ] );
        }
    }
    return ciphered.join("");
}

console.log( matrix_cipher_a("CRYPTOGRAPHYOSA", "3-1-4-2") );