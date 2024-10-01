import { authRoutes } from "./auth.js";
import { categoryRoutes, productRoutes } from "./product.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix });
  fastify.register(productRoutes, { prefix });
  fastify.register(categoryRoutes, { prefix });
};
