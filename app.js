import Fastify from "fastify";
import { connectDb } from "./src/config/connect.js";
import "dotenv/config";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter, Admin } from "./src/config/setup.js";

const start = async () => {
  await connectDb(process.env.MONGO_URI);
  const app = Fastify(); 
  await buildAdminRouter(app);
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(`Error while running server ${err}`);
    } else {
      console.log(`Server running on port ${PORT}${Admin.options.rootPath}`);
    }
  }); 
};

start(); 
