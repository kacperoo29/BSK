import { decodeRailFence, encodeRailFence } from './public/railFence.js'
import { matrix_cipher_a, matrix_decipher_a } from './public/ex_2.js'
import { matrix_cipher_b, matrix_decipher_b } from './public/ex_3.js'
import assert from 'assert'

describe('Rail fence tests', function () {
  const normalText1 = 'CRYPTOGRAPHY'
  const encodedText1 = 'CTARPORPYYGH'
  const key1 = 3

  const normalText2 = 'Never gonna give you up never gonna let you down'
  const encodedText2 = 'Ngnle i e envavpvatweneuen orn  rnyd oyu oo gogu'
  const key2 = 7

  describe('Encode test 1', function () {
    it(`should equal to "${encodedText1}" when input "${normalText1}" and key "${key1}"`, function () {
      var result = encodeRailFence(normalText1, key1)

      assert.equal(result, encodedText1)
    })
  })

  describe('Encode test 2', function () {
    it(`should equal to "${encodedText2}" when input "${normalText2}" and key "${key2}"`, function () {
      var result = encodeRailFence(normalText2, key2)

      assert.equal(result, encodedText2)
    })
  })

  describe('Decode test 1', function () {
    it(`should equal to "${normalText1}" when input "${encodedText1}" and key "${key1}"`, function () {
      var result = decodeRailFence(encodedText1, key1)

      assert.equal(result, normalText1)
    })
  })

  describe('Decode test 2', function () {
    it(`should equal to "${normalText2}" when input "${encodedText2}" and key "${key2}"`, function () {
      var result = decodeRailFence(encodedText2, key2)

      assert.equal(result, normalText2)
    })
  })
})

describe('Matrix cipher 2a tests', function () {
  const normalText1 = 'CRYPTOGRAPHYOSA'
  const encodedText1 = 'YCPRGTROHAYPAOS'
  const key1 = '3-1-4-2'

  const normalText2 = 'Never gonna give you up never gonna let you down'
  const encodedText2 = 'vNe rengo anvgiy e ou puvne rengo antleoy du nwo'
  const key2 = '3-1-2-6-5-4'

  describe('Encode test 1', function () {
    it(`should equal to "${encodedText1}" when input "${normalText1}" and key "${key1}"`, function () {
      var result = matrix_cipher_a(normalText1, key1)

      assert.equal(result, encodedText1)
    })
  })

  describe('Encode test 2', function () {
    it(`should equal to "${encodedText2}" when input "${normalText2}" and key "${key2}"`, function () {
      var result = matrix_cipher_a(normalText2, key2)

      assert.equal(result, encodedText2)
    })
  })

  describe('Decode test 1', function () {
    it(`should equal to "${normalText1}" when input "${encodedText1}" and key "${key1}"`, function () {
      var result = matrix_decipher_a(encodedText1, key1)

      assert.equal(result, normalText1)
    })
  })

  describe('Decode test 2', function () {
    it(`should equal to "${normalText2}" when input "${encodedText2}" and key "${key2}"`, function () {
      var result = matrix_decipher_a(encodedText2, key2)

      assert.equal(result, normalText2)
    })
  })
})

describe('Matrix cipher 2b tests', function () {
  const normalText1 = 'HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION'
  const encodedText1 =
    'HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS '
  const key1 = 'CONVENIENCE'

  const normalText2 = 'Never gonna give you up never gonna let you down'
  const encodedText2 = 'rygu vvey npan eivt eero nunw Ngee good ouno anl '
  const key2 = 'RICKASTLEY'

  describe('Encode test 1', function () {
    it(`should equal to "${encodedText1}" when input "${normalText1}" and key "${key1}"`, function () {
      var result = matrix_cipher_b(normalText1, key1)

      assert.equal(result, encodedText1)
    })
  })

  describe('Encode test 2', function () {
    it(`should equal to "${encodedText2}" when input "${normalText2}" and key "${key2}"`, function () {
      var result = matrix_cipher_b(normalText2, key2)

      assert.equal(result, encodedText2)
    })
  })

  describe('Decode test 1', function () {
    it(`should equal to "${normalText1}" when input "${encodedText1}" and key "${key1}"`, function () {
      var result = matrix_decipher_b(encodedText1, key1)
      var expected = normalText1.split(/\s/).join('')

      assert.equal(result, expected)
    })
  })

  describe('Decode test 2', function () {
    it(`should equal to "${normalText2}" when input "${encodedText2}" and key "${key2}"`, function () {
      var result = matrix_decipher_b(encodedText2, key2)
      var expected = normalText2.split(/\s/).join('')

      assert.equal(result, expected)
    })
  })
})
