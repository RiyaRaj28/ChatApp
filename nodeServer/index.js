const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketIo = require('socket.io')(http, {
    cors: {
        origin : "*"
    }
});

const users = {};

http.listen(8000, function(){
    console.log("server started");


    socketIo.on('connection', function (socket) {

        socket.on('new-user-joined', userName=>{
                    console.log("Name:",userName)
                    users[socket.id] = userName;
                    socket.broadcast.emit('user-joined', userName);
                });
            
                socket.on('send', message=>{
                    socket.broadcast.emit('receive', {message: message, userName : users[socket.id]})
                });

                socket.on('disconnect', message=>{
                    socket.broadcast.emit('left', users[socket.id]);
                    delete users[socket.id] 
                });
    });
})

            
