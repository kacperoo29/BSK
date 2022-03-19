function makeArray (d1, d2) {
  var arr = []
  for (let i = 0; i < d2; i++) {
    arr.push(new Array(d1))
  }
  return arr
}

export function encodeRailFence(text, n) {
  // Initialize matrix for cipher
  let rail = makeArray(n, text.length)

  // Fill the matrix with "empty" character
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j) rail[i][j] = '\n'

  let dir = 0
  let row = 0,
    col = 0
  for (let i = 0; i < text.length; ++i) {
    // Change direction if reached top or bottom
    if (row == 0 || row == n - 1) dir = !dir

    // Copy character from text to right place in matrix
    // Move to the right
    rail[row][col++] = text[i]

    // Go up or down depending on direction
    dir ? ++row : --row
  }

  // Copy everything that's not "empty" character to result
  let result = ''
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j)
      if (rail[i][j] != '\n') result += rail[i][j]

  return result
}

export function decodeRailFence(text, n) {
  // Initialize matrix for cipher
  let rail = makeArray(n, text.length)

  // Fill the matrix with "empty" character
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j) rail[i][j] = '\n'

  let dir = 0
  let row = 0,
    col = 0
  // Mark places where character is expected in cipher with "*"
  for (let i = 0; i < text.length; ++i) {
    // Change direction if reached top or bottom
    if (row == 0) dir = 1
    if (row == n - 1) dir = 0

    // Mark the place
    // Move to the right
    rail[row][col++] = '*'

    // Go up or down depending on direction
    dir ? ++row : --row
  }

  // Copy characters from cipher to expected places in matrix
  let index = 0
  for (let i = 0; i < n; ++i)
    for (let j = 0; j < text.length; ++j)
      if (rail[i][j] == '*' && index < text.length) rail[i][j] = text[index++]

  let result = ''
  row = 0
  col = 0
  // Iterate throught matrix and construct the result
  for (let i = 0; i < text.length; ++i) {
    // Change direction if reached top or bottom
    if (row == 0) dir = 1
    if (row == n - 1) dir = 0

    // If character was set copy it to the result
    // Move to the right
    if (rail[row][col] != '*')
      result += rail[row][col++]
    
    // Go up or down depending on direction
    dir ? ++row : --row
  }

  return result
}
