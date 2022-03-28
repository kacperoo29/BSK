import assert from 'assert';
import { cipherLSFR } from '../public/cipherWithLSFR.js'

describe('Matrix cipher 2b tests', function () {
    const normalText1 = 'CRYPTOGRAPHY'
    const encodedText1 = "\u000b(=mnT6\u0018ola^";
    const key1 = 'x^3';
  
    describe('Encode test 1', function () {
      it(`should equal to when input  and key `, function () {
        let string  = cipherLSFR( normalText1, key1);

        assert.equal(string, encodedText1);
      })
    })
    describe('Encode test 2', function () {
        it(`should equal to when input  and key `, function () {
          let string  = cipherLSFR( encodedText1, key1);
  
          assert.equal(string, normalText1);
        })
      })
})