const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hello server Node js')
})

server.listen(3000, () => { console.log('Hello server 3000 port'); })
const io = socketIo.listen(server);

// const nsp = io.of('/chat')

// nsp.on('connection', (socket)=>{
//     console.log('Somebody connected');
//     socket.on('newUser',()=>{
//         nsp.emit('Send to all',{name:'Aziz'})
//     })
// })

io.sockets.on('connection', (socket) => {
    // take ID

    // const data = { '1': 1, '2': 2, '3': 3 }
    // console.log(Object.keys(data));  //massiv

    // console.log(socket.id);

    // socket.join('room1')
    // socket.join('room2')
    // socket.join('room3', () => {
    //     const rooms = Object.keys(socket.rooms)
    //     console.log(rooms);
    // })
    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => {
            // let count = io.sockets.adapter.rooms[data.name].length
            io.to(data.name).emit('newJoin', { count: gOC(io, data) })
            socket.emit('join', { message: 'You r entered the room' })
            // const rooms = Object.keys(socket.rooms)
            // console.log(rooms);
        })
    })

    socket.on('leaveRoom', (data) => {
        socket.leave(data.name, () => {
            io.to(data.name).emit('leaveRoom', { count: gOC(io, data) })
            socket.emit('leaved', { message: 'You are leaved the room' })
        });
    })

    socket.on('disconnect', () => {
        console.log(`Client logged out`);
    })
})

const gOC = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name]
    return room ? room.length : 0

    //  if(room.length){
    //     return
    // }
    // else{
    //     return 0
    // }
}
