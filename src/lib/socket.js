let ioInstance = null;

const initializeSocketIO = (httpServer) => {
  if (!ioInstance) {
    ioInstance = new Server(httpServer);
    // You can add global event listeners here if needed
  }
  return ioInstance;
};

const getSocketIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized. Call initializeSocketIO first.");
  }
  return ioInstance;
};

exports = { initializeSocketIO, getSocketIO };