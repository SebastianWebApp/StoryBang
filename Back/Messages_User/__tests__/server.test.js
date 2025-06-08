// __tests__/server.test.js
import { createServer } from "http";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";

// Increase the global timeout for asynchronous tests
jest.setTimeout(60000); // 60 seconds

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

const PORT = 3001; // Using port 3001

describe("Socket.IO Server", () => {
  let io, server, clientSocket;

  beforeAll((done) => {
    console.log("Starting server setup for tests...");
    server = createServer();
    io = new Server(server, {
      cors: {
        origin: "*", // Allow all connections for testing
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected to server:", socket.id);
      socket.on("joinRoom", (room) => {
        console.log(`Client ${socket.id} joined room ${room}`);
        socket.join(room);
        socket.emit("roomJoined", room);
      });
      socket.on("Profile", ({ Id, Message, Status }) => {
        console.log(`Profile message received for room ${Id}:`, { Message, Status });
        socket.broadcast.to(Id).emit("Profile_Response", { Message, Status });
      });
    });

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      clientSocket = Client(`http://localhost:${PORT}`, {
        reconnection: false, // Disable reconnection for tests
        timeout: 10000, // Client connection timeout
      });
      clientSocket.on("connect", () => {
        console.log("Client connected:", clientSocket.id);
        done();
      });
      clientSocket.on("connect_error", (err) => {
        console.error("Client connection error:", err.message, err.stack);
        done(err);
      });
      clientSocket.on("connect_timeout", () => {
        console.error("Connection timeout");
        done(new Error("Connection timeout"));
      });
    });

    server.on("error", (err) => {
      console.error("Server startup error:", err.message, err.stack);
      done(err);
    });
  });

  afterAll((done) => {
    console.log("Closing server and connections...");
    if (clientSocket) clientSocket.close();
    if (io) io.close();
    if (server) server.close();
    done();
  });

  test("should allow client to join a room", (done) => {
    const room = "testRoom";
    clientSocket.emit("joinRoom", room);

    clientSocket.on("roomJoined", (joinedRoom) => {
      console.log("Client joined room:", joinedRoom);
      expect(joinedRoom).toBe(room);
      done();
    });
  });

  test("should emit Profile message to the room", (done) => {
    const room = "testRoom";
    const profileData = {
      Id: room,
      Message: "Test message",
      Status: "active",
    };

    const receiverSocket = Client(`http://localhost:${PORT}`, {
      reconnection: false,
      timeout: 10000,
    });

    receiverSocket.on("connect", () => {
      console.log("Receiver connected:", receiverSocket.id);
      receiverSocket.emit("joinRoom", room);

      setTimeout(() => {
        receiverSocket.on("Profile_Response", (data) => {
          console.log("Profile message received:", data);
          expect(data).toEqual({
            Message: profileData.Message,
            Status: profileData.Status,
          });
          receiverSocket.close();
          done();
        });

        clientSocket.emit("Profile", profileData);
      }, 100);
    });

    receiverSocket.on("connect_error", (err) => {
      console.error("Receiver connection error:", err.message, err.stack);
      done(err);
    });
  });

  test("should not emit to clients not in the room", (done) => {
    const room = "testRoom";
    const otherRoom = "otherRoom";
    const profileData = {
      Id: room,
      Message: "Test message",
      Status: "active",
    };

    const otherSocket = Client(`http://localhost:${PORT}`, {
      reconnection: false,
      timeout: 10000,
    });

    otherSocket.on("connect", () => {
      console.log("Other socket connected:", otherSocket.id);
      otherSocket.emit("joinRoom", otherRoom);

      otherSocket.on("Profile_Response", () => {
        console.error("Error: Received Profile_Response in wrong room");
        expect(true).toBe(false);
      });

      clientSocket.emit("Profile", profileData);

      setTimeout(() => {
        otherSocket.close();
        done();
      }, 100);
    });

    otherSocket.on("connect_error", (err) => {
      console.error("Other socket connection error:", err.message, err.stack);
      done(err);
    });
  });
});