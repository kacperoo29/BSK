namespace DES.Core
{
    public static class DESImpl
    {
        public static ulong Encrypt(ulong input, ulong key)
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

                halfs[i % 2] ^= Feistel.FeistelFunc(halfs[(i + 1) % 2], key);
            }

            result = BitwiseHelper.Combine(new Tuple<uint, uint>(halfs[1], halfs[0]));

            return Permutator.Permutate(result, Permutator.EP, 64);
        }

        public static ulong Decrypt(ulong input, ulong key)
        {
            ulong result = Permutator.Permutate(input, Permutator.IP, 64);            
            key = BitwiseHelper.ShiftToEndAndPadWithOnes(key);
            key = Permutator.Permutate(key, Permutator.PC, 64);

            var halfsTuple = BitwiseHelper.Split(result);
            uint[] halfs = new uint[] { halfsTuple.Item1, halfsTuple.Item2 };
            ulong shiftedKey = key;
            List<ulong> keys = new();
            for (int i = 0; i < 16; ++i)
            {
                shiftedKey = BitwiseHelper.ShiftHalfsLeft(shiftedKey, _keyShift[i], 56, true);
                key = Permutator.Permutate(shiftedKey, Permutator.PC2, 56);

                keys.Add(key);
            }

            for (int i = 15; i != -1; --i)
            {
                uint tmp = halfs[1];
                halfs[1] = halfs[0] ^ Feistel.FeistelFunc(halfs[1], keys[i]);
                halfs[0] = tmp;
            }

            result = BitwiseHelper.Combine(new Tuple<uint, uint>(halfs[1], halfs[0]));

            return Permutator.Permutate(result, Permutator.EP, 64);
        }

        private static int[] _keyShift = new int[16] {
            1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
        };
    }
}