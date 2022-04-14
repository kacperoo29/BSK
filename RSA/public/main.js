const encodeButton = document.getElementById('encode')
const decodeButton = document.getElementById('decode')
const calculateButton = document.getElementById('calculate')

encodeButton.addEventListener('click', encode)
decodeButton.addEventListener('click', decode)
calculateButton.addEventListener('click', functionToCalculate)

function functionToCalculate(){
  calculate()
}
function encode(){
  encrypt()
}

function decode(){
  decrypt()
}


"use strict";
        
let e, d, n, l, hiddenMessage;

function validatePrime(prime, nameOfPrime) {
    if(!isPrime(prime)) {
        alert("'" + nameOfPrime + "' is not a prime number. Please enter a prime number.");
        return false;
    }
    if(prime <= 7) {
        alert("'" + nameOfPrime + "' should be greater than 7.");
        return false;
    }
    return true;
}

function calculate() {            
    var p = document.getElementById("p").value;
    var q = document.getElementById("q").value;
    if (!(validatePrime(p, "p") && validatePrime(q, "q"))) return; 
    n = p * q;
    document.getElementById("n").innerHTML = n;
    
    l = (p - 1) * (q - 1);
    document.getElementById("l").innerHTML = l;
    
    var es = findEncryptionKeys(l, n);
    document.getElementById("e").innerHTML = es[0];
    document.getElementById("enKeyListSpan").innerHTML = " Possible encryption keys are: " + es;
    encryptorChanged();
}

function encryptorChanged() {
    e = document.getElementById("e").innerHTML;            

    var ds = findDecryptionKeys(e, l);
    ds.splice(ds.indexOf(e), 1);
    d = ds[0];
    document.getElementById("d").innerHTML = d;
    document.getElementById("deKeyListSpan").innerHTML = " Possible decryption keys are: " + ds;

    document.getElementById("private-key").innerHTML = "(" + e + "," + n + ")";
    document.getElementById("public-key").innerHTML = "(" + d + "," + n + ")";
}

function decryptorChanged() {
    d = document.getElementById("d").innerHTML;
    document.getElementById("public-key").innerHTML = "(" + d + "," + n + ")";
}

function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num !== 1;
}

function findEncryptionKeys(l, n) {
    var arr = [];
    for(var i = 2; i < l; i++) {
        if(isCoPrime(i, l) && isCoPrime(i, n))
            arr.push(i);
            if(arr.length > 5) break;
    }     
    return arr;
}

function isCoPrime(a, b) {            
    var aFac = findFactors(a);
    var bFac = findFactors(b);
    var result = aFac.every(x => bFac.indexOf(x) < 0);
    return result;
}

var hashtable = new Object();
function findFactors(num) {
    if(hashtable[num])
        return hashtable[num];

    var half = Math.floor(num / 2),
        result = [],
        i, j;
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? result.push(i) : false;
    }

    result.push(num);
    hashtable[num] = result;
    return result;
}

function findDecryptionKeys(e, l) {
    var ds = [];
    for(var x = l + 1;x < l + 100000; x++) {
        if(x * e % l === 1) {
            ds.push(x);
            if(ds.length > 5)   return ds;
        }
    }     
    return ds;
}

function encrypt() {
    var m = document.getElementById("message").value;
    hiddenMessage = m;
    var ascii = Array.from(Array(m.length).keys()).map(i => m.charCodeAt(i));
    document.getElementById("ascii").innerHTML = ascii;         
    var encrypted = ascii.map(i => powerMod(i, e, n));   
    document.getElementById("encrypted-msg").innerHTML = encrypted;
    document.getElementById("encrypted-msg-textbox").value = encrypted;
}

function decrypt() {
    var cipher = stringToNumberArray(document.getElementById("encrypted-msg-textbox").value);
    console.log(cipher)
    var ascii = cipher.map(i => powerMod(i, d, n));
    console.log("hihi", ascii)
    document.getElementById("ascii-decrypted").innerHTML = ascii;
    var message = "";
    ascii.map(x => message += String.fromCharCode(x));
    console.log("wiadomosc", message)
    console.log("wiadomosc23", d)
    document.getElementById("decrypted-msg").innerHTML = (typeof d == 'undefined') ? hiddenMessage : message;
}

function stringToNumberArray(str) {
    return str.split(",").map(i => parseInt(i));
}

function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}       
