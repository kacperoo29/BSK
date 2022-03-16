import { encodeRailFence, decodeRailFence } from './railFence.js'
import { matrix_cipher_a, matrix_decipher_a } from './ex_2.js'
import { matrix_cipher_b, matrix_decipher_b } from './ex_3.js'

const input = document.getElementById('input')
const output = document.getElementById('output')
const key = document.getElementById('key')
const algorithm = document.getElementById('algorithm')

const encodeButton = document.getElementById('encode')
const decodeButton = document.getElementById('decode')

encodeButton.addEventListener('click', encode)
decodeButton.addEventListener('click', decode)

function encode () {
  console.log(algorithm.value)
  switch (parseInt(algorithm.value)) {
    case 0:
      output.value = encodeRailFence(input.value, parseInt(key.value))
      break
    case 1:
      output.value = matrix_cipher_a(input.value, key.value)
      break
    case 2:
      output.value = matrix_cipher_b(input.value, key.value)
      break
  }
}

function decode () {
  switch (parseInt(algorithm.value)) {
    case 0:
      output.value = decodeRailFence(input.value, parseInt(key.value))
      break
    case 1:
      output.value = matrix_decipher_a(input.value, key.value)
      break
    case 2:
      output.value = matrix_decipher_b(input.value, key.value)
      break
  }
}
