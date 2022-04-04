using DES.Core;
using Xunit;

namespace DES.Test
{
    public class DESTest
    {
        [Fact]
        public void ShouldEncode()
        {
            ulong input = 0x0123456789ABCDEF;
            ulong key = 0xFFFFFFFFFFFFFFFF;

            ulong output = DESImpl.Encode(input, key);

            Assert.Equal(0x6DCE0DC9006556A3ul, output);
        }
    }
}