using System;
using System.Collections.Generic;
using DES.Core;
using Xunit;

namespace DES.Test
{
    public class PermutatorTest
    {
        private static IEnumerable<object[]> Matrices()
        {
            yield return new object[]
            {
                0b1010,
                new List<int>() { 2, 1, 4, 3 },
                0b0101,
                4
            };
            yield return new object[]
            {
                0b10101010,
                new List<int>() { 2, 1, 8, 3, 5, 6, 7, 4 },
                0b01011010,
                8
            };
            yield return new object[]
            {
                0b1010101010101010,
                new List<int>() { 16, 2, 9, 1, 11, 14, 8, 10, 3, 5, 15, 12, 6, 7, 4, 13 },
                0b0011100011100101,
                16
            };
            yield return new object[]
            {
                0b10101010101010101010101010101010,
                new List<int>() { 26, 16, 22, 2, 27, 9, 32, 31, 23, 1, 25, 11, 14, 17, 8, 24, 10, 21, 18, 3, 30, 5, 15, 19, 12, 20, 6, 28, 7, 4, 13, 29 },
                0b00001101111101000101011100001011,
                32
            };
            yield return new object[]
            {
                0b10010100111001101011101110111011100111001001110000111100,
                Permutator.PC2,
                0b111110011111110100001100111100001110100001100111,
                56
            };
            yield return new object[]
            {
                0b1001010011100110101110111011101110011100100111000011110011010010,
                Permutator.PC,
                0b10111111100000100100111011111000111001110011011111001101,
                64
            };
        }

        [Theory]
        [MemberData(nameof(Matrices))]
        public void ShouldPermutate(ulong input, List<int> matrix, ulong expected, int sourceSize)
        {
            ulong output = Permutator.Permutate(input, matrix, sourceSize);

            Assert.Equal(expected, output);
        }
    }
}