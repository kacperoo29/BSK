using System;
using DES.Core;
using Shouldly;
using Xunit;

namespace DES.Test
{
    public class BitwiseHelperTest
    {
        [Fact]
        public void ShouldProperlyShiftLeftBy1Place()
        {
            ulong input = 0b1100000000000000000000000000000011000000000000000000000000000000;

            ulong result = BitwiseHelper.ShiftHalfsLeft(input, 1);

            Assert.Equal(0b1000000000000000000000000000000010000000000000000000000000000000, result);
        }

        [Fact]
        public void ShouldProperlyShiftLeftBy2Places()
        {
            ulong input = 0b1110000000000000000000000000000011100000000000000000000000000000;

            ulong result = BitwiseHelper.ShiftHalfsLeft(input, 2);

            Assert.Equal(0b1000000000000000000000000000000010000000000000000000000000000000, result);
        }

        [Fact]
        public void ShouldReverseBits()
        {
            ulong input = 0xFFFFFFFF00000000;

            ulong result = BitwiseHelper.ReverseBits(input);

            Assert.Equal(0x0000000FFFFFFFF, result);
        }

        [Fact]
        public void ShouldReverseBitsAdvanced()
        {
            ulong input = 0x0123456789ABCDEF;

            ulong result = BitwiseHelper.ReverseBits(input);

            Assert.Equal(0xF7B3D591E6A2C480, result);
        }

        [Fact]
        public void ShouldSplitProperly()
        {
            ulong input = 0x000000AF000000BC;

            var result = BitwiseHelper.Split(input);

            Assert.Equal(0xAFu, result.Item1);
            Assert.Equal(0xBCu, result.Item2);
        }

        [Fact]
        public void ShouldCombine()
        {
            Tuple<uint, uint> input = new Tuple<uint, uint>(0xAF, 0xBC);
        
            var result = BitwiseHelper.Combine(input);
        
            Assert.Equal(0x000000AF000000BCul, result);
        }

        [Fact]
        public void ShiftShouldBeContentAware()
        {
            ulong input = 0xF000000F000000;

            ulong result = BitwiseHelper.ShiftHalfsLeft(input, 2, 56);

            Assert.Equal(0xC000000C000000ul, result);
        }

        
        [Fact]
        public void ShouldFillWithOnes()
        {
            ulong input = 0x2C;
            
            ulong result = BitwiseHelper.ShiftToEndAndPadWithOnes(input);

            Assert.Equal(0x2CFFFFFFFFFFFFFFul, result);
        }

        [Fact]
        public void ShouldFillWithMoreOnes()
        {
            ulong input = 0x2FAC00001;
            
            ulong result = BitwiseHelper.ShiftToEndAndPadWithOnes(input);

            Assert.Equal(0x2FAC00001FFFFFFFul, result);
        }

        [Fact]
        public void ShouldFillWithZeroes()
        {
            ulong input = 0x2C;
            
            ulong result = BitwiseHelper.ShiftToEndAndPadWithZeroes(input);

            Assert.Equal(0x2C00000000000000ul, result);
        }
    }
}