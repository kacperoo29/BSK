const bits = 127
function State(){
    this.state = 1 << 127 ^ 1;
}
var objectWithState = new State();

export function reloadState(){
    objectWithState = new State();
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
    var newbit = objectWithState.state
    taps.forEach((tap) => {
        newbit ^= objectWithState.state >> (bits - tap) 
    })

    newbit &= 1
    objectWithState.state = (objectWithState.state >> 1) ^ (newbit << bits)

    return newbit
}
