using System.Runtime.CompilerServices;
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
            return DESImpl.Encrypt(input.Input, input.Key);
        }

        [HttpPost]
        [Route("api/encryptFile")]
        public async Task<ActionResult<IEnumerable<OutputFile>>> EncryptFile([FromForm] InputFile input)
        {
            try
            {
                return Ok(await DecodeOrEncodeFile(input, DESImpl.Encrypt));
            }
            catch (InvalidDataException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("api/decryptFile")]
        public async Task<ActionResult<IEnumerable<OutputFile>>> DecryptFile([FromForm] InputFile input)
        {
            try
            {
                return Ok(await DecodeOrEncodeFile(input, DESImpl.Decrypt));
            }
            catch (InvalidDataException e)
            {
                return BadRequest(e.Message);
            }
        }

        private async Task<IEnumerable<OutputFile>> DecodeOrEncodeFile(InputFile input, Func<ulong, ulong, ulong> function)
        {
            List<(byte[], string)> files = new();
            if (input.Files == null)
                throw new InvalidDataException("Must specify files to encode");

            foreach (var file in input.Files)
            {
                await using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                files.Add((memoryStream.ToArray(), file.FileName));
            }

            List<OutputFile> encodedFiles = new();
            foreach (var (file, fileName) in files)
            {
                List<byte> bytes = new(file);
                for (int i = bytes.Count % 8; i != 0 && i < 8; ++i)
                    bytes.Add(0);

                List<ulong> encodedList = new(bytes.Count / 8);
                for (int i = 0; i < bytes.Count; i += 8)
                {
                    ulong result = 0x0;
                    for (int j = 0; j < 8; ++j)
                        result |= ((ulong)bytes[(7 - j) + i] << (j * 8));

                    encodedList.Add(function(result, input.Key));
                }

                List<byte> split = new(encodedList.Count * 8);
                foreach (var encoded in encodedList)
                    for (int i = 7; i != -1; --i)
                        split.Add((byte)(encoded >> (i * 8)));

                encodedFiles.Add(new OutputFile
                {
                    Data = split.ToArray(),
                    FileName = "processed-" + fileName
                });
            }

            return encodedFiles;
        }
    }
}