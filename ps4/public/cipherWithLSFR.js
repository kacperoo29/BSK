function charsToBinary(text_to_convert){
    
    let output_value = "";
    for (var i = 0; i < text_to_convert.length; i++)
      output_value += text_to_convert[i].charCodeAt(0).toString(2) + " ";
    return output_value;
}

function binaryToChars(text_to_deconvert){
    
    var output_value = '';

    text_to_deconvert.split(' ').map(function(bin) {
        output_value += String.fromCharCode(parseInt(bin, 2));
    });
    return output_value;
}

function cipherLSFR(text){
    let binaryString = charsToBinary(text);
    let binaryStringInArray = binaryString.split(" ");
    let newCodedBinaryString = [];
    binaryString.forEach((e) =>{
        let newlyCreatedString = '';
        for(let i = 0 ; i < e.length ; ++i){
            lsfr()
            newlyCreatedString += '';
        }
    });
    return binary_to_chars(text);
}
