function makeArray (d1, d2) {
  var arr = []
  for (let i = 0; i < d2; i++) {
    arr.push(new Array(d1))
  }
  return arr
}

export function encodeRailFence (text, n) {
  let rail = makeArray(n, text.length)

  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j) rail[i][j] = '\n'

  let dir = 0
  let row = 0,
    col = 0
  for (let i = 0; i < text.length; ++i) {
    if (row == 0 || row == n - 1) dir = !dir

    rail[row][col++] = text[i]

    dir ? ++row : --row
  }

  let result = ''
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j)
      if (rail[i][j] != '\n') result += rail[i][j]

  return result
}

export function decodeRailFence (text, n) {
  let rail = makeArray(n, text.length)

  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j) rail[i][j] = '\n'

  let dir = 0
  let row = 0,
    col = 0
  for (let i = 0; i < text.length; ++i) {
    if (row == 0) dir = 1
    if (row == n - 1) dir = 0

    rail[row][col++] = '*'

    dir ? ++row : --row
  }

  let index = 0
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j)
      if (rail[i][j] == '*' && index < text.length) rail[i][j] = text[index++]

  let result = ''
  row = 0
  col = 0
  for (let i = 0; i < text.length; ++i) {
    if (row == 0) dir = 1
    if (row == n - 1) dir = 0

    if (rail[row][col] != '*')
      result += rail[row][col++]
    
    dir ? ++row : --row
  }

  return result
}
