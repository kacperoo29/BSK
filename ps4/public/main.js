import { lfsr } from './lfsr.js'

const output = document.getElementById('output')
const key = document.getElementById('key')

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')

var state = 0

startButton.addEventListener('click', () => {
    var taps = key.value
    output.value = ""
    state = 1

    var interval = setInterval(() => {
        if (!state)
            clearInterval(interval)
        
        var tmp = lfsr(taps)
        console.log(tmp)
        output.value += tmp
    }, 500)
})

stopButton.addEventListener('click', () => {
    state = 0
})

