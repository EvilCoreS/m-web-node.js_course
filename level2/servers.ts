import http, {IncomingMessage, ServerResponse} from 'http'
import net from 'net'
import udp from 'dgram'

function httpServer(){
    const host = 'localhost'
    const port = 8000

    const requestListener = function (req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200);
        res.end("My first server!");
    };

    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });

    server.on('request', (req, res) => {
        req.on('data', (message) => {
            `Message: ${message.toString()}\nFrom: ${req.socket.remoteAddress}\nDate: ${new Date()}`
            console.log(message.toString());
        })
    })
}

function tcpServer() {
    let server = net.createServer(function(socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.on('connection', (req) => {
        req.on('data', (message) => {
            console.log("Got message:");
            console.log(message.toString());
            req.write('Hello, client. Love, Server.')
        })
    })

    server.listen(1337, '127.0.0.1');
}

function udpServer() {
    let server = udp.createSocket('udp4');

// emits when any error occurs
    server.on('error',function(error){
        console.log('Error: ' + error);
        server.close();
    });

// emits on new datagram msg
    server.on('message',function(msg,info){
        console.log('Data received from client : ' + msg.toString());
        console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

//sending msg
        server.send(msg,info.port,'localhost',function(error){
            if(error){
                server.close();
            }else{
                console.log('Data sent !!!');
            }

        });

    });

//emits when socket is ready and listening for datagram msgs
    server.on('listening',function(){
        let address = server.address();
        let port = address.port;
        let family = address.family;
        let ipaddr = address.address;
        console.log('Server is listening at port' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

//emits after the socket is closed using socket.close();
    server.on('close',function(){
        console.log('Socket is closed !');
    });

    server.bind(2222);

    setTimeout(function(){
        server.close();
    },8000);
}


let arr = []
const number = 2
arr = [httpServer, tcpServer, udpServer]
arr[number]()