using System.Text.RegularExpressions;

namespace DES.Core
{
    public class LFSR
    {
        private ulong _rail = (1ul << 63) + 1;
        private List<int> _taps = new() { 1 };
        private List<int> _realTaps = new() { 0 };

        public ulong Seed { get => _rail; set => _rail = value; }
        public List<int> Taps { get => _taps; }

        public LFSR()
        {
            SetTaps("x^64+x^63+x^61+x^60+1");
        }

        public ulong GenerateKey()
        {
            ulong result = 0;
            for (int i = 0; i < 64; ++i)
            {
                result <<= 1;
                result |= GenerateBit();
            }

            return result;
        }

        public ulong GenerateBit()
        {
            ulong newbit = _rail;
            foreach (var tap in _realTaps)
                newbit ^= _rail >> tap;

            newbit &= 1;
            _rail = (_rail >> 1) | (newbit << 63);

            return newbit;
        }

        public void SetTaps(string taps)
        {
            _taps.Clear();

            var split = Regex.Split(taps, @"\s");
            var expected = String.Join("", split);
            expected = Regex.Replace(expected, @"1\+|\+1", "");
            expected = Regex.Replace(expected, @"x\^", "");
            expected = Regex.Replace(expected, @"x", "1");

            var stringArray = Regex.Split(expected, @"\+");
            foreach (var tap in stringArray)
            {
                int value = int.Parse(tap);
                _taps.Add(value);
                _realTaps.Add(value - 1);
            }
        }
    }
}
