// этот файл надо будет дописать...

// не обращайте на эту функцию внимания
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();


// вот эту функцию собственно надо написать`
function parseTcpStringAsHttpRequest(string) {
    const regMethod = /[A-Z]+ \/[a-zA-Z\/]+/,
        regHeaders = /[a-z\-]+: [a-z.\/\-, 0-9*]+/i,
        regBody = /[a-z=0-9]+&[a-z=+]+/i
    let method, uri, headers = {}, body, arr = []
    string.split('\n')
        .filter(e => e.length !== 0)
        .map(e => {
            let str = e.match(regMethod)
            if (str !== null) {
                let temp = str[0].split(' ')
                method = temp[0]
                uri = temp[1]
            }

            str = e.match(regHeaders)
            if (str !== null) {
                arr.push(str[0])
            }

            str = e.match(regBody)
            if (str !== null) {
                body = str[0]
            }
        })
    arr.map(e => {
        let temp = e.split(': ')
        temp[0] = temp[0] === "HOST" ? 'Host' : temp[0]
        headers[temp[0]] = temp[1]
    })
    return {
        method: method,
        uri : uri,
        headers:  headers,
        body : body,
    };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));