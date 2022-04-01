namespace DES.Core
{
    public static class DES
    {
        public static ulong Encode(ulong input)
        {
            ulong result = Permutator.Permutate(input, Permutator.IP);
            ulong key = 0xFFFFFFFFFFFF; // TODO: Generate key or smth XD
            key = Permutator.Permutate(key, Permutator.PC);

            var halfsTuple = BitwiseHelper.Split(result);
            uint[] halfs = new uint[] { halfsTuple.Item1, halfsTuple.Item2 };

            for (int i = 0; i < 16; ++i)
            {
                ulong shiftedKey = BitwiseHelper.ShiftHalfsLeft(key, KeyShift[i]);
                key = Permutator.Permutate(shiftedKey, Permutator.PC2);

                // Thanks C#, not cool
                halfs[i % 2] ^= Feistel.FeistelFunc(halfs[i % 2 != 0 ? 1 : 0], key);
            }

            result = BitwiseHelper.Combine(new Tuple<uint, uint>(halfs[0], halfs[1]));

            return Permutator.Permutate(result, Permutator.EP);
        }

        private static int[] KeyShift = new int[16] {
            1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1
        };
    }
}