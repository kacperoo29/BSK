import { lfsr, reloadState } from './lfsr.js'

//text into binary code 
function charsToBinary(text_to_convert) {
    
    // prepare empty string
    let outputValue = ''

    // iterate by all the length of text to convert
    for (var i = 0; i < text_to_convert.length; ++i) {

        let tempValueOfString = ''
        // convert letter to binary code
        tempValueOfString += text_to_convert[i].charCodeAt(0).toString(2)

        // fill with 0, if length of converted letter 6 bits long
        for (let i = 0; i < 7 - tempValueOfString.length; ++i)
            outputValue += '0'
        
        // add spaces, when not in last index 
        if (i !== text_to_convert.length) 
            outputValue += tempValueOfString + ' '
    }
    return outputValue
}

//binary code into text
function binaryToChars(text_to_deconvert) {
    var output_value = ''

    // iterate thorugh entire array and change binary code into string
    text_to_deconvert.split(' ').map(function (bin) {
        output_value += String.fromCharCode(parseInt(bin, 2))
    })
    return output_value
}

// cipher
export function cipherLSFR(text, coded) {
    // reload file with lfsr to begin code from the start
    reloadState()

    // text into binary
    let binaryString = charsToBinary(text)

    // split text with binary code into array
    let binaryStringInArray = binaryString.split(' ')

    // initialize array, which will contain ciphered/deciphered text
    let newCodedBinaryString = []

    //iterate through whole array 
    binaryStringInArray.forEach(e => {

        // initialize string, which will store string from xor operation on binary code
        let newlyCreatedString = ''

        //iterate through every bit in binary array 
        for (let i = 0; i < e.length; ++i) {

            // get random bit
            let random_bit = lfsr(coded)

            // xor operation
            let stringGet = BigInt(parseInt(e[i])) ^ random_bit

            // append into string created bit
            newlyCreatedString += stringGet
        }
        // if string is not blank append into final result
        if (newlyCreatedString !== '') newCodedBinaryString.push(newlyCreatedString)
    })
    // array into string
    let codedText = newCodedBinaryString.join(' ')

    // return binary code turned into readable text
    return binaryToChars(codedText)
}
