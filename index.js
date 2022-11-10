const express = require('express');
const app = express();
const http = require('http').Server(app);//le damos el objeto app que hemos creado
const io = require('socket.io')(http)//llamamos al socket

const PUERTO = 8080;

app.get('/chat', (req, res) => {
    res.render('index.ejs')
});

const server = http.listen(PUERTO, () => {
    console.log(`Escuchando por el puerto ${PUERTO}`);
})//llama a la ejecución del puerto y el render

io.sockets.on("connection", (socket) => {
    //el socket esta atento de quien se conecta
    socket.on("username", (username) => {
        socket.username = username;     
        io.emit("is_online", `<i> ${socket.username} se ha unido al chat </i>`)
    })
    //el socket esta atento de quien se desconecta
    socket.on("disconnect", (username) => {
        socket.username = username; 
        io.emit("is_online", `<i> ${username} ha abandonado el chat</i>`)
    })
    //el socket esta atento quien y que escribe
    socket.on("chat_message", (message) => {
        io.emit("is_online", `<strong> ${socket.username} </strong> ${message}`)
    })
})

