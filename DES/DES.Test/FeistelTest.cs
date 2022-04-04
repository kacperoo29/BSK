using System;
using DES.Core;
using Xunit;

namespace DES.Test
{
    public class FeistelTest
    {
        [Fact]
        public void ShouldCipher()
        {
            uint input = 0b1010; 
            ulong key = 0b1000;

            uint output = Feistel.FeistelFunc(input, key);

            Assert.Equal(0xDAD8D3BD, output);
        }
    }
}
