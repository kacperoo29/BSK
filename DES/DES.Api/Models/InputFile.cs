namespace DES.Api.Models
{
    public class InputFile
    {
        public List<IFormFile>? Files { get; set; }
        public ulong Key { get; set; }
    }
}