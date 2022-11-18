import * as http from "http";
import net from 'net'
import udp from 'dgram'


function httpReq() {
    const options = {
        url: 'http://localhost',
        port: 8000,
        method: 'POST',
        body: 123
    }

    const post_req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    })

    post_req.write('555555555555555');
    post_req.end();
}

function tcpReq() {
    const client = new net.Socket();
    client.connect(1337, '127.0.0.1', function() {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}

function udpReq() {
    let buffer = require('buffer');

// creating a client socket
    let client = udp.createSocket('udp4');

//buffer msg
    let data = Buffer.from('siddheshrane');

    client.on('message',function(msg,info){
        console.log('Data received from server : ' + msg.toString());
        console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
    });

//sending msg
    client.send(data,2222,'localhost',function(error){
        if(error){
            client.close();
        }else{
            console.log('Data sent !!!');
        }
    });

    let data1 = Buffer.from('hello');
    let data2 = Buffer.from('world');

//sending multiple msg
    client.send([data1,data2],2222,'localhost',function(error){
        if(error){
            client.close();
        }else{
            console.log('Data sent !!!');
        }
    });
}

const number = 2
let arr = []
arr = [httpReq, tcpReq, udpReq]
arr[number]()