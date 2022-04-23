import { AxiosRequestConfig, AxiosResponse } from "axios"
import { DESApi, OutputFile } from "./api/api"

const api = new DESApi();
const encodeFileButton = document.getElementById("encodeFileButton")
const decodeFileButton = document.getElementById("decodeFileButton")
const formFile = <HTMLInputElement>document.getElementById("formFile")
const generateKeyButton = document.getElementById("generateKeyButton")
const keyInput = <HTMLInputElement>document.getElementById("key")
const setPolynomialButton = document.getElementById("setPolynomialButton")
const polynomialInput = <HTMLInputElement>document.getElementById("polynomial")

let key: number = 0
keyInput.value = key.toString(16)

keyInput.onchange = (event) => {
    key = parseInt(keyInput.value, 16)
}

setPolynomialButton.onclick = (event: MouseEvent) => {
    api.apiSetTapsPut(polynomialInput.value)
}

encodeFileButton.onclick = (event: MouseEvent) => {
    if (formFile.files.length == 0) return;

    decodeOrEncode(api.apiEncryptFilePost)
}

decodeFileButton.onclick = (event: MouseEvent) => {
    if (formFile.files.length == 0) return;

    decodeOrEncode(api.apiDecryptFilePost)
}

generateKeyButton.onclick = (event: MouseEvent) => {
    api.apiGetKeyGet().then((response) => {
        key = response.data
        keyInput.value = key.toString(16)
    })
}

function decodeOrEncode(apiFunc: (files?: Array<any>, key?: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<any[], any>>) {
    let files = new Array<File>()
    Array.from(formFile.files).forEach((file) => files.push(file))
    apiFunc.apply(api, [files, key]).then((response) => {
        let files = response.data as OutputFile[]
        if (files == null)
            return;

        files.forEach((file, i) => {
            var buffer = Buffer.from(file.data, "base64")
            var url = URL.createObjectURL(new Blob([buffer]))
            var a = document.createElement("a")
            a.style.display = "none";
            a.href = url;
            a.download = `file${i}.bin`;
            a.click()
            URL.revokeObjectURL(url)
        })
    })
}
