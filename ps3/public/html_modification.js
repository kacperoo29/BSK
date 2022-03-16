let key = document.getElementById("key");
// key.addEventListener('keyup', function(evt){
//     var n = parseInt(this.value.replace(/\D/g,''), "-");
//     key.value = n;
// }, false);
console.log(algorithm);
switch(algorithm.value){
    case '0':
        key.type = "number";
        break;
    case '1':
        key.type = "text";
        break;
    case '2':
        key.type = "text";
        break;
}
algorithm.addEventListener("change", somF);

function somF(e){
    switch(e.target.value){
        case '0':
            key.type = "number";
            break;
        case '1':
            key.type = "text";
            break;
        case '2':
            key.type = "text";
            break;
    }
}