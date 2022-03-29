import { cipherLSFR } from '../public/cipherWithLSFR.js'

const encode = document.getElementById('encode')
const decode = document.getElementById('decode')

const input = document.getElementById('input')
const key = document.getElementById('key')
const output = document.getElementById('output')

encode.addEventListener('click', () => {
    output.value = cipherLSFR(input.value, key.value);
})
decode.addEventListener('click', () => {
    output.value = cipherLSFR(input.value, key.value);
})