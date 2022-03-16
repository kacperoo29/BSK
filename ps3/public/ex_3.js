 export function matrix_cipher_b(text, key_in_text){
    let key = alphabetIntoCode(text, key_in_text);

    return matrix_cipher(text, key);
}
export function matrix_decipher_b(text, key_in_text){
    let key = alphabetIntoCode(text, key_in_text);

    return matrix_decipher(text, key);
}

export function validateKey2b(key)
{
    let regex = /^[A-Z]+$/

    return regex.test(key)
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
function matrix_decipher(text, key){
    let text_splitted_by_spaces = text.split(" ");
    let longest = findLongestWordLength(text_splitted_by_spaces);
    let v = "";
    for(let i = 0 ; i < longest ; ++i){
        for(let j = 0 ; j < key.length; ++j){
            if(text_splitted_by_spaces[ key[j] - 1 ].length > i)
                v += text_splitted_by_spaces[ key[j] - 1 ][i];
        }
    }
    return v;
}
function findLongestWordLength(str) {
    return Math.max(...str.map(word => word.length));
}

function alphabetIntoCode(text, key_in_text){
    let key_index = 1;
    let trimmed_key_in_text = key_in_text.replace(new RegExp(" ", 'g'), "").toUpperCase();
    let key = new Array( trimmed_key_in_text.length );
    // ASCII numbers A=65 Z=90
    for( let i = 65 ; i <= 90 ; ++ i)
        if( trimmed_key_in_text.includes( String.fromCharCode(i) ) )
            for( let j = 0 ; j < text.length ; ++j)
                if( trimmed_key_in_text[j] == String.fromCharCode(i) )
                    key[j] = key_index++;
    return key;
}
