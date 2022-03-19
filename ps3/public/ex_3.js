 export function matrix_cipher_b(text, key_in_text){
    // change letters from key to numbers
    let key = alphabetIntoCode(text, key_in_text);
    
    //cipher the text 
    return matrix_cipher(text, key);
}
export function matrix_decipher_b(text, key_in_text){
    // change letters from key to numbers
    let key = alphabetIntoCode(text, key_in_text);
    
    //decipher the text 
    return matrix_decipher(text, key);
}

export function validateKey2b(key)
{
    let regex = /^[A-Z]+$/

    return regex.test(key)
}

function matrix_cipher(text, key){
    // get rid of all spaces - this cipher doesn't need it
    let text_in_array = text.replace(new RegExp(" ", 'g'), "");

    // prepare array for cyphered word
    let cyphered_array = [];

    //iterate through whole key set 
    for( let t = 1 ; t <= key.length ; ++t){
        // find the occurence of next position in key
        let current_index = key.findIndex(e => e == t);
        
        //every length of key array put a char into cyphered word 
        for( let i = 0 ; i < text_in_array.length ; i += key.length )
            cyphered_array.push( text_in_array[ i + current_index] );

        // add a space after each key
        cyphered_array.push(" ");
    }
    // change array into string
    return cyphered_array.join("");
}
function matrix_decipher(text, key){
    // prepare the text
    let text_splitted_by_spaces = text.split(" ");
    
    //find the longest word among text 
    let longest = findLongestWordLength(text_splitted_by_spaces);

    // prepare string for decoded string
    let decoded_string = "";

    // iterate through length of longest word in given encoded text
    for(let i = 0 ; i < longest ; ++i){

        // iterate thorugh all keys in set
        for(let j = 0 ; j < key.length; ++j){

            // if length of text is smaller than iterating index, add a character from encoded string to decoded string  
            if(text_splitted_by_spaces[ key[j] - 1 ].length > i)
                decoded_string += text_splitted_by_spaces[ key[j] - 1 ][i];
        }
    }
    return decoded_string;
}
function findLongestWordLength(str) {
    return Math.max(...str.map(word => word.length));
}

function alphabetIntoCode(text, key_in_text){
    let key_index = 1;
    // key replaced every space into "" and uppercased
    let trimmed_key_in_text = key_in_text.replace(new RegExp(" ", 'g'), "").toUpperCase();
    
    // create new array which will have all key values 
    let key = new Array( trimmed_key_in_text.length );

    // ASCII numbers A=65 Z=90
    for( let i = 65 ; i <= 90 ; ++ i)
        // if key have this letter
        if( trimmed_key_in_text.includes( String.fromCharCode(i) ) )
            // iterate through text
            for( let j = 0 ; j < text.length ; ++j)
                // if iterated key matched char
                if( trimmed_key_in_text[j] == String.fromCharCode(i) )
                    // add to newly created array incremented index
                    key[j] = key_index++;
    return key;
}
