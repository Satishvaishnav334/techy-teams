    // server.js (at the root of your project)
    import { createServer } from "node:http";
    import next from "next";
    import { Server } from "socket.io";

    const dev = process.env.NODE_ENV !== "production";
    const hostname = "localhost";
    const port = 3001;

    const app = next({ dev, hostname, port });
    const handler = app.getRequestHandler();

    app.prepare().then(() => {
        const httpServer = createServer(handler);
        const io = new Server(httpServer);

        io.on("connection", (socket) => {
            console.log("A user connected");

            socket.on("message", (msg) => {
                io.emit("message", msg); // Broadcast message to all connected clients
            });

            socket.on("disconnect", () => {
                console.log("User disconnected");
            });
        });

        httpServer.listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
    });