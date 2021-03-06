import { lfsr, reloadState } from './lfsr.js'

const output = document.getElementById('output')
const key = document.getElementById('key')

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')

var state = 0

startButton.addEventListener('click', () => {
    if(state == 0){

        var taps = key.value
        output.value = ""
        state = 1

        var interval = setInterval(() => {
            if (!state)
                clearInterval(interval)
            var tmp = lfsr(taps)
            output.value += tmp
        }, 500)
    }

})

stopButton.addEventListener('click', () => {
    state = 0
    reloadState();
})

