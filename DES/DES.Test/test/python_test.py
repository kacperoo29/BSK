import requests
import json
import base64
HEADERS = {
    'accept': 'text/plain'
}
def check_if_files_original_and_generated_the_same(number):
    if type(number) == int and number >= 0:
        temp_number = number
    else:
        temp_number = ""

    file_original = f'test{temp_number}.bin'
    transitive_file = f'helper{temp_number}.bin'
    final_file = f'final{temp_number}.bin'

    make_request(file_original, transitive_file, '1234123412341234', if_true_encryption_else_decryption=True)
    make_request(transitive_file, final_file, '1234123412341234', if_true_encryption_else_decryption=False)

    f = open(final_file, "rb")
    f2 = open(file_original, "rb")
    try:
        assert( f2.read() in f.read())
    except:
        print( f"Too many bits in one of files in example with {file_original}")
    

    f.close()
    f2.close()

def make_request(input_file, output_file, key, if_true_encryption_else_decryption):
    binary_file = open(input_file, 'rb') 
    files = {
        'Files': binary_file,
        'Key': (None, key),
    }
    if if_true_encryption_else_decryption == True:
        response = requests.post('http://localhost:5090/api/encryptFile', headers=HEADERS, files=files)
    else:
        response = requests.post('http://localhost:5090/api/decryptFile', headers=HEADERS, files=files)

    text = bytes(json.loads(response.content)[0].get("data"), 'utf-8')
    f = open(output_file, "wb")
    
    print(base64.decodebytes(text))
    f.write( base64.decodebytes(text) ) 
    binary_file.close
    f.close()

check_if_files_original_and_generated_the_same(-1)
check_if_files_original_and_generated_the_same(2)
check_if_files_original_and_generated_the_same(3)
