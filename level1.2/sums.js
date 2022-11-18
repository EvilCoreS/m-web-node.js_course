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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let str = ''
    const headers1 = {
        "Server": "Apache/2.2.14 (Win32)",
        "Connection": "Closed",
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": String(body).length
    }
    Object.entries(headers1).map(e => {
        str += e.join(': ')
        str += '\n'
    })
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date()}
${str}
${body}`);
}

function processHttpRequest(method, uri, headers, body) {
    let statusCode = '200', statusMessage = 'OK'
    if (!(/^\/sum/.test(uri))) {
        statusCode = '404'
        statusMessage = 'Not Found'
        body = 'not found'
    }
    else if(method !== "GET" || !(/\?nums=[0-9,]+/.test(uri))) {
        statusCode = "400"
        statusMessage = "Bad Request"
        body = 'not found'
    }
    else {
        body = uri.match(/\?nums=[0-9,]+/)[0]
            .split('=')[1]
            .split(',')
            .reduce((s, c, i) => {
                return s += Number(c)
            }, 0)
    }
    outputHttpResponse(statusCode, statusMessage, headers, body);
}

function parseTcpStringAsHttpRequest(string) {
    const regMethod = /[A-Z]+ \/[a-z]+\?[a-z]+=[0-9,]+/,
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
processHttpRequest(http.method, http.uri, http.headers, http.body);
