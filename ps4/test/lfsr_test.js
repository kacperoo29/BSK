import assert from 'assert';
import { cipherLSFR } from '../public/cipherWithLSFR.js'

describe('LSFR cipher test', function () {
    const normalText1 = 'CRYPTOGRAPHY'
    const encodedText1 = "\x0F4jI\x18)tK\r6{@";
    const key1 = 'x^3';
  
    const normalText2 = 'test bardzo wazny'
    const encodedText2 = ";\u001c3m_zbm\u0017z\\^GgE\by";
    const key2 = 'x^3+x^5+x^9';

    describe('Encode test 1', function () {
        it(`should equal to ${encodedText1} when input ${normalText1} and key ${key1}`, function () {
        let string = cipherLSFR( normalText1, key1);

        assert.equal(string, encodedText1);
        })
    })
    describe('Decode test 1', function () {
        it(`should equal to ${normalText1} when input ${encodedText1} and key ${key1}`, function () {
            let string = cipherLSFR( encodedText1, key1);

            assert.equal(string, normalText1);
        })
    })

    describe('Encode test 2', function () {
        it(`should equal to ${encodedText2} when input ${normalText2} and key ${key2}`, function () {
        let string = cipherLSFR( normalText2, key2);

        assert.equal(string, encodedText2);
        })
    })    
    describe('Decode test 2', function () {
        it(`should equal to ${normalText2} when input ${encodedText2} and key ${key2}`, function () {
            let string = cipherLSFR( encodedText2, key2);

            assert.equal(string, normalText2);
        })
    })
})