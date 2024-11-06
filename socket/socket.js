const io = require('socket.io')(8800, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  })
  
  let activeUsers = []
  
  io.on("connection", (socket) => {
    //add new User
    socket.on('add-new-user', (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id
        })
      }
      console.log("Connected User", activeUsers)
      io.emit('get-user', activeUsers)
    })

    // send message
    socket.on('send-message', (data) => {
      const { receiverId } = data
      const user = activeUsers.find((user) => user.userId === receiverId)
      console.log('sending from socket to :', receiverId);
      console.log("data", data)
      if (user) {
        io.to(user.socketId).emit('receive-message', data)
      }
    })
  
    socket.on('disconnect', () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
      io.emit('get-user', activeUsers)
    })
  })