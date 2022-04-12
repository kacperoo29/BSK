using System.Text.Json.Serialization;

namespace DES.Api.Models
{
    public class InputFile
    {
        public string File { get; set; }
        public ulong Key { get; set; }
    }
}