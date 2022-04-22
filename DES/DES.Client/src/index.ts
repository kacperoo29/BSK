import { AxiosRequestConfig, AxiosResponse } from "axios";
import { DESApi } from "./api/api";

const api = new DESApi();
const encodeFileButton = document.getElementById("encodeFileButton");
const decodeFileButton = document.getElementById("decodeFileButton");
const formFile = <HTMLInputElement>document.getElementById("formFile");

encodeFileButton.onclick = (event: MouseEvent) => {
    if (formFile.files.length == 0) return;

    decodeOrEncode(api.apiEncryptFilePost)
}

decodeFileButton.onclick = (event: MouseEvent) => {
    if (formFile.files.length == 0) return;

    decodeOrEncode(api.apiDecryptFilePost)
}

function decodeOrEncode(apiFunc: (files?: Array<any>, key?: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<any[], any>>) {
    let files = new Array<File>()
    Array.from(formFile.files).forEach((file) => files.push(file))
    apiFunc.apply(api, [files, 64]).then((response) => {
        response.data[0].fileContents
        let files = response.data
        if (files == null)
            return;

        files.forEach((file, i) => {
            var url = URL.createObjectURL(new Blob([file.fileContents]))
            var a = document.createElement("a")
            a.style.display = "none";
            a.href = url;
            a.download = `file${i}.bin`;
            a.click()
            URL.revokeObjectURL(url)
        })
    })
}
