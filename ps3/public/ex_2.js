
export function matrix_cipher_a(text, key){
    let array_of_key = key.split("-");        
    let text_into_array = text.split("");
    return matrix_cipher(text_into_array, array_of_key);
}
export function matrix_decipher_a(text, key){
    let array_of_key = key.split("-");        
    let text_into_array = text.split("");
    return matrix_decipher(text_into_array, array_of_key);
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

function matrix_decipher(text_in_array, array_of_key){
    let deciphered = new Array(text_in_array.length);
    let index = 0;
    
    for( let i = 0 ; i < text_in_array.length ; i += array_of_key.length ){
        let how_many_keys_iterate_through = array_of_key.length;
        let duplicated_array_of_key = array_of_key;

        if( i + array_of_key.length > text_in_array.length ){
            how_many_keys_iterate_through = text_in_array.length - i;
            duplicated_array_of_key = array_of_key.filter(function(value){ 
                return value <= how_many_keys_iterate_through;
            });
        }

        for( let j = 1 ; j <= duplicated_array_of_key.length ; ++j ){
            let key_index = duplicated_array_of_key.findIndex( e => e == j.toString() ); 
            if( i + key_index  < text_in_array.length )
                deciphered[ index++ ] = text_in_array[ i + key_index ];
        }
    }

    return deciphered.join("");
}
