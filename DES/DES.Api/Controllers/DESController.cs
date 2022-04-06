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
        [Route("api/encodeFile")]
        public ActionResult<byte[]> EncodeFile([FromBody] InputFile file)
        {
            // Pad file so that bitCount % 64 == 0

            // Encode every 64 bits

            // Throw them all together
            throw new NotImplementedException();
        }
    }
}