const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)
const publicDir = '/public/'
app.use(express.static(__dirname + publicDir))

app.get('/', (req, res) => {
  res.sendFile(__dirname + publicDir + '/index.html')
})

io.on('connection', (socket) => {
  // message
  socket.on('send_message', function (data) {
    io.emit('return_message', data)
  })
  // typing
  socket.on('send_focus', function (data) {
    io.emit('return_focus')
  })
  // blurred/not typing
  socket.on('send_blur', function (data) {
    io.emit('return_blur')
  })
})

var port = process.env.PORT || 3000

server.listen(port, () => {
  console.log("listening on *:3000")
})
