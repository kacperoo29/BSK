
export function matrix_cipher_a(text, key){
    // parsing key to array ex. 3-1-2 to [3,1,2]
    let array_of_key = key.split("-");
    
    // parsing text to encode to array
    let text_into_array = text.split("");

    // return encoded string
    return matrix_cipher(text_into_array, array_of_key);
}

export function matrix_decipher_a(text, key){
    // parsing key to array ex. 3-1-2 to [3,1,2]
    let array_of_key = key.split("-");        

    // parsing text to encode to array
    let text_into_array = text.split("");

    // return decoded string
    return matrix_decipher(text_into_array, array_of_key);
}

export function validateKey2a(key) {
    let regex = /^[0-9]+(-[0-9]+)*$/
    if (!regex.test(key))
        return false

    let array_of_key = key.split("-")
    let valid = true
    let existing = []
    for (let element of array_of_key) {        
        let intElement = parseInt(element)
        if (intElement > array_of_key.length || existing.includes(intElement)) {
            valid = false
            break
        }
        existing.push(intElement)
    }

    return valid
}

function matrix_cipher(text_into_array, array_of_key){
    let ciphered = [];
    // iterate every key length
    for( let i = 0 ; i < text_into_array.length ; i += array_of_key.length ){

        // iterate through every char in key
        for( let j = 0 ; j < array_of_key.length ; ++j ){

            // get number from array with keys
            let key_index = parseInt(array_of_key[ j ] ) - 1; 

            // if some iteration of whole key length + key from key array index < length of string with message 
            if( i + key_index  < text_into_array.length )
                // add to ciphered string char from index of iteration of whole key length + key from key array index
                ciphered.push( text_into_array[ i + key_index ] );
        }
    }
    // join arrays with "" char
    return ciphered.join("");
}

function matrix_decipher(text_in_array, array_of_key){

    let deciphered = new Array(text_in_array.length);
    let index = 0;

    // iterate every key length
    for( let i = 0 ; i < text_in_array.length ; i += array_of_key.length ){


        let how_many_keys_iterate_through = array_of_key.length;
        let duplicated_array_of_key = array_of_key;

        // if decoded_string.length % key.length != 0 at the last iteration, 
        //we need to get rid of too big keys to not meet any problems
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
