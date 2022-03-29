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
    }
}