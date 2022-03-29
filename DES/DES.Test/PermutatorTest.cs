using System;
using System.Collections.Generic;
using DES.Core;
using Xunit;

namespace DES.Test
{
    public class PermutatorTest
    {
        [Fact]
        public void ShouldPermutate4Bits()
        {
            List<int> matrix = new() { 2, 1, 4, 3 };
            ulong input = 0b1010;

            ulong output = Permutator.Permutate(input, matrix);

            Assert.Equal(0b0101ul, output);
        }

        [Fact]
        public void ShouldPermutate8Bits()
        {
            List<int> matrix = new() { 2, 1, 8, 3, 5, 6, 7, 4 };
            ulong input = 0b10101010;

            ulong output = Permutator.Permutate(input, matrix);

            Assert.Equal(0b10100101ul, output);
        }

        [Fact]
        public void ShouldPermutate16Bits()
        {
            List<int> matrix = new() { 16, 2, 9, 1, 11, 14, 8, 10, 3, 5, 15, 12, 6, 7, 4, 13 };
            ulong input = 0b1010101010101010;

            ulong output = Permutator.Permutate(input, matrix);

            Assert.Equal(0b0101100011100011ul, output);
        }

        [Fact]
        public void ShouldPermutate32Bits()
        {
            List<int> matrix = new() { 26, 16, 22, 2, 27, 9, 32, 31, 23, 1, 25, 11, 14, 17, 8, 24, 10, 21, 18, 3, 30, 5, 15, 19, 12, 20, 6, 28, 7, 4, 13, 29 };
            ulong input = 0b10101010101010101010101010101010;

            ulong output = Permutator.Permutate(input, matrix);

            Assert.Equal(0b00101111000101011101000001001111ul, output);
        }
    }
}