using DES.Core;
using Xunit;

namespace DES.Test
{
    public class DESTest
    {
        [Theory]
        [InlineData(0x0123456789ABCDEF, 0xFFFFFFFFFFFFFFFF, 0x6DCE0DC9006556A3)]
        [InlineData(0x1234123456785678, 0xCCC, 0xAAC89B66CD98958A)]
        [InlineData(0xAB00000000000000, 0xABCDEF1234567890, 0x84A42A67C8A5E081)]
        public void ShouldEncode(ulong input, ulong key, ulong expected)
        {
            ulong output = DESImpl.Encode(input, key);

            Assert.Equal(expected, output);
        }
    }
}