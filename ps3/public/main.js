import { encodeRailFence, decodeRailFence } from './railFence.js'
import { matrix_cipher_a, matrix_decipher_a, validateKey2a } from './ex_2.js'
import { matrix_cipher_b, matrix_decipher_b, validateKey2b } from './ex_3.js'

const input = document.getElementById('input')
const output = document.getElementById('output')
const key = document.getElementById('key')
const algorithm = document.getElementById('algorithm')

const encodeButton = document.getElementById('encode')
const decodeButton = document.getElementById('decode')

encodeButton.addEventListener('click', encode)
decodeButton.addEventListener('click', decode)
key.addEventListener('input', validateKey)
algorithm.addEventListener('change', changeKeyType)

let validKey = true

function isPositiveInteger (str) {
  if (typeof str !== 'string') {
    return false
  }

  const num = Number(str)

  if (Number.isInteger(num) && num > 0) {
    return true
  }

  return false
}

function changeKeyType (e) {
  switch (e.target.value) {
    case '0':
      key.type = 'number'
      break
    case '1':
      key.type = 'text'
      break
    case '2':
      key.type = 'text'
      break
  }
}

function validateKey (e) {
  switch (parseInt(algorithm.value)) {
    case 0:
      validKey = isPositiveInteger(key.value)
      break
    case 1:
      validKey = validateKey2a(key.value)
      break
    case 2:
      validKey = validateKey2b(key.value)
      break
  }

  if (!validKey && !key.classList.contains('is-invalid'))
    key.classList.add('is-invalid')

  if (validKey) key.classList.remove('is-invalid')
}

function encode () {
  if (!validKey) return

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
  if (!validKey) return

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
