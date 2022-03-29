namespace DES.Core
{
    public static class Permutator
    {
        public static ulong Permutate(ulong input, List<int> matrix)
        {
            ulong result = 0;
            for (int i = 0; i < matrix.Count; ++i)
            {
                result ^= (input & (1ul << (matrix[i] - 1))) != 0 ? (1ul << i) : 0;
            }

            return result;
        }
    }
}