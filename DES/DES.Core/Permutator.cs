namespace DES.Core
{
    public static class Permutator
    {  
        public static List<int> IP { get => _initialPermutation; }        
        public static List<int> PC { get => _permutedChoice; }
        public static List<int> PC2 { get => _permutedChoice2; }

        public static ulong Permutate(ulong input, List<int> matrix)
        {
            ulong result = 0;
            for (int i = 0; i < matrix.Count; ++i)
            {
                result ^= (input & (1ul << (matrix.Count - 1 - (matrix[i] - 1)))) != 0 ? (1ul << (matrix.Count - 1 - i)) : 0;
            }

            return result;
        }

        private static List<int> _initialPermutation = new()
        {
            58, 50, 42, 34, 26, 18, 10, 2,
            60, 52, 44, 36, 28, 20, 12, 4,
            62, 54, 46, 38, 30, 22, 14, 6,
            64, 56, 48, 40, 32, 24, 16, 8,
            57, 49, 41, 33, 25, 17, 9,  1,
            59, 51, 43, 35, 27, 19, 11, 3,
            61, 53, 45, 37, 29, 21, 13, 5,
            63, 55, 47, 39, 31, 23, 15, 7 
        };

        private static List<int> _permutedChoice = new()
        {
            57, 49, 41, 33, 25, 17, 9,
             1, 58, 50, 42, 34, 26, 18,
            10, 2,  59, 51, 43, 35, 27,
            19, 11, 3,  60, 52, 44, 36,
            63, 55, 47, 39, 31, 23, 15,
             7, 62, 54, 46, 38, 30, 22,
            14, 6,  61, 53, 45, 37, 29,
            21, 13, 5,  28, 20, 12, 4
        };

        private static List<int> _permutedChoice2 = new()
        {
            14, 17, 11, 24, 1, 5,
             3, 28, 15, 6,  21, 10,
            23, 19, 12, 4,  26, 8,
            16, 7,  27, 20, 13, 2,
            41, 52, 31, 37, 47, 55,
            30, 40, 51, 45, 33, 48,
            44, 49, 39, 56, 34, 53,
            46, 42, 50, 36, 29, 32
        };      
    }
}