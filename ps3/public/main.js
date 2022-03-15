import { encodeRailFence, decodeRailFence } from './railFence.js'

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
      break
    case 2:
      break
  }
}

function decode () {
  switch (parseInt(algorithm.value)) {
    case 0:
      output.value = decodeRailFence(input.value, parseInt(key.value))
      break
    case 1:
      break
    case 2:
      break
  }
}
