import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { registerSessionSockets } from "./sockets/index.js";

const PORT = process.env.PORT || 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

registerSessionSockets(io);

httpServer.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
