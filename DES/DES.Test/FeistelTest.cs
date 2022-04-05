using System;
using DES.Core;
using Xunit;

namespace DES.Test
{
    public class FeistelTest
    {
        [Theory]
        [InlineData(0b1010, 0b1000, 0xDAD8D3BD)]
        public void ShouldCipher(uint input, ulong key, ulong expected)
        {
            uint output = Feistel.FeistelFunc(input, key);

            Assert.Equal(expected, output);
        }
    }
}
