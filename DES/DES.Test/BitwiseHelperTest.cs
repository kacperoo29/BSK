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
    }
}