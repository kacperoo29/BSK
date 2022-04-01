using System;

namespace DES.Core
{
    public static class Feistel
    {
        public static uint FeistelFunc(uint input, ulong key)
        {
            ulong extended = Permutator.Permutate((ulong)input, Permutator.E);
            uint result = 0;
            extended ^= key;
            for (int i = 0; i < 8; ++i)
            {
                // Shift left 6 * place bits to get current 
                // then cast to byte and shift right 2 to get rid of unneeded part
                // shift left 2 after that to align with beggining
                int idxValue = ((((byte)(extended >> (6 * (7 - i)))) << 2) >> 2);

                // First (0x20) digit as higher part of index and last (0x1) as lower part of index
                int x = ((idxValue & 0x20) << 1) | idxValue & 0x1;
                // Middle part as y index (0x1E)
                int y = (idxValue & 0x1E) >> 1;

                // Xor result with number from table at right index (4 * place bits)
                result ^= (S[i][x][y]) << (4 * (7 - i));
            }

            return (uint)Permutator.Permutate((ulong)result, Permutator.P);
        }

        private static uint[][][] S = new uint[][][] {
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            // TODO: Copy proper values
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            },
            new uint[][] {
                new uint[] { 14, 4,  13, 1, 2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0, 7  },
                new uint[] { 0,  15, 7,  4, 14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3, 8  },
                new uint[] { 4,  1,  14, 8, 13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5, 0  },
                new uint[] { 15, 12, 8,  2, 4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13 }
            }
        };
    }
}