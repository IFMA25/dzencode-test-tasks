export const registerSessionSockets = (io) => {
  const broadcastCount = () => {
    io.emit("sessions:count", io.engine.clientsCount);
  };

  io.on("connection", (socket) => {
    broadcastCount();

    socket.on("disconnect", () => {
      broadcastCount();
    });
  });
};
