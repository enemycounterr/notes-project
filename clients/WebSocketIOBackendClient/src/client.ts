import io  from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log(`Connected to server with ID: ${socket.id}`);
  socket.emit("subscriberMessage", "Hello from backend client!");
});

socket.on("message", (data: string) => {
  console.log("Server says:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
