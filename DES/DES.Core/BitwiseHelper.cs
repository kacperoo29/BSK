using System;

namespace DES.Core
{
    public static class BitwiseHelper
    {
        public static ulong ShiftHalfsLeft(ulong input, int places, int contentSize = sizeof(ulong) * 8, bool circular = false)
        {
            if (contentSize % 2 != 0)
                throw new Exception("Content size should be divisible by 2");

            if (contentSize > sizeof(ulong) * 8)
                throw new Exception("Content size can't be more than 64 bits");

            int sizeDiff = ((sizeof(ulong) * 8) - contentSize) / 2;

            uint leftPart = (uint)(input >> (contentSize / 2));
            uint rightPart = ((uint)input << sizeDiff) >> sizeDiff;

            leftPart <<= places;
            rightPart <<= places;

            if (circular)
            {
                uint mask = 0x0;
                for (int i = 0; i < places; ++i)
                {
                    mask ^= 1;
                    mask <<= 1;
                }
                mask >>= 1;
                mask <<= 32 - sizeDiff;

                uint leftRemainder = leftPart & mask;
                leftRemainder >>= 32 - sizeDiff;
                uint rightRemainder = rightPart & mask;
                rightRemainder >>= 32 - sizeDiff;

                leftPart |= leftRemainder;
                rightPart |= rightRemainder;
            }

            leftPart <<= sizeDiff;
            leftPart >>= sizeDiff;
            rightPart <<= sizeDiff;
            rightPart >>= sizeDiff;

            ulong result = 0;
            result ^= ((ulong)leftPart << (contentSize / 2));
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

        public static Tuple<uint, uint> Split(ulong input)
        {
            return new Tuple<uint, uint>((uint)(input >> 32), (uint)input);
        }

        public static ulong Combine(Tuple<uint, uint> input)
        {
            ulong result = 0;
            result ^= ((ulong)input.Item1 << 32);
            result ^= (ulong)input.Item2;

            return result;
        }

        public static ulong ShiftToEndAndPadWithOnes(ulong input)
        {
            ulong mask = 0xF000000000000000ul;

            for (int i = 0; (input & mask) == 0; ++i)
            {
                input <<= 4;
                input |= 0xFul;
            }

            return input;
        }

        public static ulong ShiftToEndAndPadWithZeroes(ulong input)
        {
            ulong mask = 0xF000000000000000ul;

            for (int i = 0; (input & mask) == 0; ++i)
            {
                input <<= 4;
                input &= (~0x0ul) - 0xFul;
            }

            return input;
        }
    }
}