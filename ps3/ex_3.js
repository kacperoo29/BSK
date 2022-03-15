function matrix_cipher_b(text, key_in_text){
    let key_index = 1;
    let key = new Array( key_in_text.length );
    for( let i = 65 ; i < 91 ; ++ i){
        if( key_in_text.includes( String.fromCharCode(i) ) )
            for( let j = 0 ; j < text.length ; ++j)
                if( key_in_text[j] == String.fromCharCode(i) )
                    key[j] = key_index++;
    }
    return matrix_cipher(text, key);
}
function matrix_cipher(text, key){
    console.log(text);
    console.log(key);
    console.log(text);
    let text_in_array = text.replace(new RegExp(" ", 'g'), "");
    console.log(text_in_array);
    let cyphered_array = [];
    for( let t = 1 ; t <= key.length ; ++t){
        let current_index = key.findIndex(e => e == t);
        console.log(current_index);
        for( let i = 0 ; i < text_in_array.length ; i += (key.length)){
            console.log(i);
            cyphered_array.push( text_in_array[ i + current_index] );
        }
        cyphered_array.push(" ");
    }
    return cyphered_array.join("");
}
console.log( matrix_cipher_b("HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION", "CONVENIENCE") );