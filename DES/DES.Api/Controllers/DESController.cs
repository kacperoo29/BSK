using DES.Api.Models;
using DES.Core;
using Microsoft.AspNetCore.Cors;
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
            return DESImpl.Encrypt(input.Input, input.Key);
        }

        [HttpPost]
        [Route("api/encodeFile")]
        public async Task<ActionResult<List<FileContentResult>>> EncodeFile([FromForm] InputFile input)
        {
            List<byte[]> files = new();
            if (input.Files == null)
                return BadRequest("Must specify files to encode");

            foreach (var file in input.Files)
            {
                await using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                files.Add(memoryStream.ToArray());
            }

            List<FileContentResult> encodedFiles = new();
            foreach (var file in files)
            {
                List<byte> bytes = new(file);
                for (int i = bytes.Count % 8; i != 0 && i < 8; ++i)
                    bytes.Add(0);

                List<ulong> encodedList = new();
                for (int i = 0; i < bytes.Count; i += 8)
                {
                    ulong result = 0x0;
                    for (int j = 0; j < 8; ++j)
                        result |= ((ulong)bytes[(7 - j)+ i] << (j * 8));

                    encodedList.Add(DESImpl.Encrypt(result, input.Key));
                }

                List<byte> split = new();
                foreach (var encoded in encodedList)
                {
                    for (int i = 0; i < 8; ++i)
                        split.Add((byte)(encoded >> (i * 8)));
                }

                encodedFiles.Add(new FileContentResult(split.ToArray(), "application/x-binary"));
            }
            
            return Ok(encodedFiles);
        }
    }
}