const bits = 127

var state = 1 << 127 ^ 1;

export function reloadState(){
    state = 1 << 127 ^ 1;
}

export function lfsr(taps, isNew) {
    var array = parser(taps)
    return lfsr_impl(array)
}

export function generateBytes(taps) {
    var array = parser(taps)

    return generateBytes_impl(array)
}

function parser(taps) {
    var expected = taps.split(/\s/).join('')
    expected = expected.replace(/1\+|\+1/, '')
    expected = expected.replace(/x\^/, '')
    expected = expected.replace(/x/, '1')

    var array = expected.split(/\+/)
    array.forEach(n => n = parseInt(n))

    return array
}

function generateBytes_impl(taps) {
    var result = 0
    for (var i = 0; i < bits; ++i) {
        result ^= lfsr_impl(taps) << i
    }

    return result
}

function lfsr_impl(taps) {
    taps.forEach((tap) => --tap)
    var newbit = state
    taps.forEach((tap) => {
        newbit ^= state >> (bits - tap) 
    })

    newbit &= 1
    state = (state >> 1) ^ (newbit << bits)

    return newbit
}
