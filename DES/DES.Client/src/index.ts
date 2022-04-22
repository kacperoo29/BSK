import { DESApi } from "./api/api";

const api = new DESApi();
const encodeFileButton = document.getElementById("encodeFileButton");
const formFile = <HTMLInputElement>document.getElementById("formFile");

encodeFileButton.onclick = (event: MouseEvent) => {
    if (formFile.files.length == 0) return;

    let files = new Array<File>()
    Array.from(formFile.files).forEach((file) => files.push(file))
    api.apiEncodeFilePost(files, 64).then((response) => {
        response.data[0].fileContents
        let files = response.data
        if (files == null)
            return;

        files.forEach((file, i) => {
            var url = URL.createObjectURL(new Blob([file.fileContents]))
            var a = document.createElement("a")
            a.style.display = "none";
            a.href = url;
            a.download = `encoded${i}.bin`;
            a.click()
            URL.revokeObjectURL(url)
        })
    })
}
