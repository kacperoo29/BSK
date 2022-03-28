const bits = 127n

var state = 1n << bits ^ 1n;

export function reloadState(){
    state = 1n << bits ^ 1n;
}

export function lfsr(taps) {
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
    array.forEach((n, i) => array[i] = BigInt(parseInt(n)))

    return array
}

function generateBytes_impl(taps) {
    var result = 0n
    for (var i = 0; i < bits; ++i) {
        result ^= lfsr_impl(taps) << i
    }

    return result
}

function lfsr_impl(taps) {
    // Reduce every power by one for algorithm
    taps.forEach((tap) => --tap)

    // Copy current state
    var newbit = state
    // For each power xor current state in its place
    taps.forEach((tap) => {
        newbit ^= state >> (bits - tap) 
    })

    // Take the last bit of the result
    newbit &= 1n
    // Shift the old state and xor it with generated bit
    // at the beggining
    state = (state >> 1n) ^ (newbit << bits)

    return newbit
}
