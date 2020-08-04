const http = require('http');
const socketIo = require('socket.io');





const server = http.createServer((req, res) => {
    res.end('Hello server Node js')
})




server.listen(3000, () => { console.log('Hello server 3000 port'); })
const io = socketIo.listen(server);

io.sockets.on('connection', (socket) => {
    // console.log('Client connected');
    // socket.on('SayHello', (data) => {
    //     console.log(data.name);
    //     // console.log(`Hello client I'm from server`);
    // })

    // setTimeout(() => {
    //     socket.emit('catch', { city: 'Tashkent' })
    // }, 2000);

    socket.on('NewUser', (data) => {
        socket.broadcast.emit('user', { name: data.name })
    })



    socket.on('disconnect', () => {
        console.log(`Client logged out`);
    })
})