import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register-cointroller";

export async function appRoutes(app: FastifyInstance) {
    app.post("/register", registerController)
}