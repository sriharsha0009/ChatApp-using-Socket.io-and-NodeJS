//node server which will handle socket io connections
const io =require('socket.io')(8000,)

const users ={};

io.on('connection',socket => {
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        //console.log(socket.client.conn.server.clientsCount);
        socket.broadcast.emit('user-joined',{name:name, count:socket.client.conn.server.clientsCount})
    });

    socket.on('send',message=>{
       // console.log(message);
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });

    socket.on('disconnect',data => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
})