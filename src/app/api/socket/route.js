import { Server } from "socket.io";

let io;

export async function GET(req) {
  if (!io) {
    console.log("Starting Socket.IO server...");

    io = new Server(globalThis.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket server running");
}
