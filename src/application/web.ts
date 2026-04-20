import express from "express";
import { publicRouter } from "../routes/routes";
import { errorMiddleware } from "../middleware/error-middleware";
import { swaggerSpec } from "../docs/api-docs";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../docs/swagger-output.json";
import cors from "cors";
import rateLimiter from "../middleware/limiter-middleware";
export const web = express();

web.use(cors());
web.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(rateLimiter);
web.use("/api", publicRouter);
web.use(errorMiddleware)