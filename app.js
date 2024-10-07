import Fastify from "fastify";
import { connectDb } from "./src/config/connect.js";
import "dotenv/config";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter, Admin } from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    const app = Fastify();

    app.register(fastifySocketIO, {
      cors: {
        origin: "*",
      },
      pingInterval: 10000,
      pingTimeout: 5000,
      transports: ["websocket"],
    }); 

    await registerRoutes(app);
    await buildAdminRouter(app);

    app.listen({ port: PORT }, (err, addr) => {
      if (err) {
        console.error(`Error while running server: ${err}`);
        process.exit(1);
      } else {
        console.log(`Server running on ${addr}`);
      }
    });

    app.ready().then(() => {
      app.io.on("connection", (socket) => {
        console.log("A user connected ✅");

        socket.on("joinRoom", (orderId) => {
          socket.join(orderId);
          console.log(`🏚 User joined room ${orderId}`);
        });

        socket.on("disconnect", () => {
          console.log("User Disconnected 🛑");
        });
      });
    });
  } catch (error) {
    console.error(`Error during startup: ${error}`);
    process.exit(1);
  }
};

start();
