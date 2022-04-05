namespace DES.Core
{
    public static class DESImpl
    {
        public static ulong Encode(ulong input, ulong key)
        {
            ulong result = Permutator.Permutate(input, Permutator.IP, 64);
            key = BitwiseHelper.ShiftToEndAndPadWithOnes(key);
            key = Permutator.Permutate(key, Permutator.PC, 64);

            var halfsTuple = BitwiseHelper.Split(result);
            uint[] halfs = new uint[] { halfsTuple.Item1, halfsTuple.Item2 };
            ulong shiftedKey = key;

            for (int i = 0; i < 16; ++i)
            {
                shiftedKey = BitwiseHelper.ShiftHalfsLeft(shiftedKey, _keyShift[i], 56, true);
                key = Permutator.Permutate(shiftedKey, Permutator.PC2, 56);

                halfs[i % 2] ^= Feistel.FeistelFunc(halfs[i % 2 == 0 ? 1 : 0], key);
            }

            result = BitwiseHelper.Combine(new Tuple<uint, uint>(halfs[1], halfs[0]));

            return Permutator.Permutate(result, Permutator.EP, 64);
        }

        private static int[] _keyShift = new int[16] {
            1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
        };
    }
}