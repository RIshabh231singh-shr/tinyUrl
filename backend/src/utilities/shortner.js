const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = 62;
function encode(id){
    let result = ""; 
    if(id === 0){
        return ALPHABET[0];
    }
    while(id > 0){
        result = ALPHABET[id % BASE] + result;
        id = Math.floor(id / BASE);
    }
    return result;
}

function decode(code){
    let id = 0;
    for(let i =0; i<code.length;i++){
        let value = ALPHABET.indexOf(code[i]);
        if(value === -1) throw new Error("Invalide code");
        id = (id * BASE) + value;
    }
    return id;
}

