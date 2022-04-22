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
        [InlineData(0x3c3f786d6c207665, 0x40, 0xa9fb884a47f119a2)]
        public void ShouldEncrypt(ulong input, ulong key, ulong expected)
        {
            ulong output = DESImpl.Encrypt(input, key);

            Assert.Equal(expected, output);
        }


        [Theory]
        [InlineData(0x6DCE0DC9006556A3, 0xFFFFFFFFFFFFFFFF, 0x0123456789ABCDEF)]
        [InlineData(0xAAC89B66CD98958A, 0xCCC, 0x1234123456785678)]
        [InlineData(0x84A42A67C8A5E081, 0xABCDEF1234567890, 0xAB00000000000000)]
        public void ShouldDecrypt(ulong input, ulong key, ulong expected)
        {
            ulong output = DESImpl.Decrypt(input, key);

            Assert.Equal(expected, output);
        }
    }
}