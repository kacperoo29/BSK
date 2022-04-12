using DES.Api.Models;
using DES.Core;
using Microsoft.AspNetCore.Mvc;

namespace DES.Api.Controllers
{   
    [ApiController]
    public class DESController : ControllerBase
    {
        [HttpPost]
        [Route("api/encode")]
        public ActionResult<ulong> Encode64([FromBody] Input64 input)
        {
            return DESImpl.Encode(input.Input, input.Key);
        }
        [HttpPost]
        [Route("api/example")]
        public ActionResult<ulong> Huhi([FromBody] Input64 input)
        {
            return input.Input + input.Key * 5;
        }
        [HttpPost]
        [Route("api/encodeFile")]
        public ActionResult<byte[]> EncodeFile([FromBody] InputFile file)
        {
            List<byte> list = new();        
            byte som = Convert.ToByte("d7", 16);
            for( int i = 0; i < file.File.Length-1; ++i )
            {

                List<char> twoChars = file.File.Skip(i * 2).Take(2).ToList();

                string chars = string.Join("", twoChars);
                som = Convert.ToByte(chars, 16);
            }

            for (int i = file.File.Length % 8; i != 0 && i < 8; ++i)
                list.Add(0);
            
            // // Encode every 64 bits
            List<ulong> encodedList = new();
            for (int i = 0; i < list.Count; i += 8)
            {
                ulong input = 0x0;
                for(int j = 0; j < 8; ++j)
                    input |= ((ulong)list[7 - j] << j * 8);

                encodedList.Add(DESImpl.Encode(input, file.Key));
            }
            
            // // Throw them all together
            List<byte> converted = new();
            for (int i = 0; i < encodedList.Count; ++i)
            {
                for(int j = 0; j < 8 ; ++j)
                    converted.Add((byte)(encodedList[i] >> (j * 8)));
            }

            return Ok(converted);
        }
    }
}