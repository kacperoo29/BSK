import { lfsr, reloadState } from './lfsr.js'

function charsToBinary(text_to_convert) {
    let outputValue = ''

    for (var i = 0; i < text_to_convert.length; ++i) {
        let tempValueOfString = ''
        tempValueOfString += text_to_convert[i].charCodeAt(0).toString(2)
        for (let i = 0; i < 7 - tempValueOfString.length; ++i) {
            outputValue += '0'
        }
        if (i !== text_to_convert.length) outputValue += tempValueOfString + ' '
    }
    return outputValue
}

function binaryToChars(text_to_deconvert) {
    var output_value = ''

    text_to_deconvert.split(' ').map(function (bin) {
        output_value += String.fromCharCode(parseInt(bin, 2))
    })
    return output_value
}

export function cipherLSFR(text, coded) {
    reloadState()
    let binaryString = charsToBinary(text)
    let binaryStringInArray = binaryString.split(' ')
    let newCodedBinaryString = []
    binaryStringInArray.forEach(e => {
        let newlyCreatedString = ''
        for (let i = 0; i < e.length; ++i) {
            let random_bit = lfsr(coded)

            let stringGet = BigInt(parseInt(e[i])) ^ random_bit

            newlyCreatedString += stringGet
        }
        if (newlyCreatedString !== '') newCodedBinaryString.push(newlyCreatedString)
    })
    let codedText = newCodedBinaryString.join(' ')
    return binaryToChars(codedText)
}
