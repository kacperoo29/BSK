export function matrix_cipher_b(text, key_in_text){
    let trimmed_key_in_text = key_in_text.replace(new RegExp(" ", 'g'), "").toUpperCase();
    let key_index = 1;
    let key = new Array( trimmed_key_in_text.length );
    // ASCII numbers A=65 Z=90
    for( let i = 65 ; i <= 90 ; ++ i){
        if( trimmed_key_in_text.includes( String.fromCharCode(i) ) )
            for( let j = 0 ; j < text.length ; ++j)
                if( trimmed_key_in_text[j] == String.fromCharCode(i) )
                    key[j] = key_index++;
    }
    return matrix_cipher(text, key);
}

function matrix_cipher(text, key){
    let text_in_array = text.replace(new RegExp(" ", 'g'), "");
    let cyphered_array = [];
    for( let t = 1 ; t <= key.length ; ++t){
        let current_index = key.findIndex(e => e == t);
        for( let i = 0 ; i < text_in_array.length ; i += key.length )
            cyphered_array.push( text_in_array[ i + current_index] );
        cyphered_array.push(" ");
    }
    return cyphered_array.join("");
}