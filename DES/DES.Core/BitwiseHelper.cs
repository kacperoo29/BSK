namespace DES.Core
{
    public static class BitwiseHelper 
    {
        public static ulong ShiftHalfsLeft(ulong input, int places)
        {
            uint leftPart = (uint)(input >> 32);
            uint rightPart = (uint)input;

            leftPart <<= places;
            rightPart <<= places;

            ulong result = 0;
            result ^= ((ulong)leftPart << 32);
            result ^= (ulong)rightPart;

            return result;
        }

        public static ulong ReverseBits(ulong input)
        {
            // http://graphics.stanford.edu/~seander/bithacks.html#ReverseParallel
            ulong mask = ~0ul;
            int s = sizeof(ulong) * 8;

            while ((s >>= 1) > 0)
            {
                mask ^= (mask << s);
                input = ((input >> s) & mask) | ((input << s) & ~mask);
            }

            return input;
        }
    }
}