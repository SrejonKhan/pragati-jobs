import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpStatus from "http-status";
import config from "./config/base.config";
import logger from "./utils/logger";
import morgan from "morgan";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
import authRouter from "./routers/v1/auth.router";
import { globalErrorHandler, notFoundHandler } from "./middlewares/error.middleware";
import docsRouter from "./routers/v1/docs.router";
import courseRouter from "./routers/v1/course.router";
import jobRouter from "./routers/v1/job.router";
import skillRouter from "./routers/v1/skill.router";
import userRouter from "./routers/v1/user.router";
import mentorshipRouter from "./routers/v1/mentorship.router";
import postRouter from "./routers/v1/post.router";
import { serve } from "swagger-ui-express";

const server = express();

/*-------------------MIDDLEWARES-------------------*/
server.use(helmet());
server.use(cors({ origin: "*" }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
if (config.ENV === "development") {
  // server.use(morgan("combined", { stream: logger.stream }));
}

/*-------------------ROUTERS-------------------*/
server.use("/api/v1/auth", authRouter);
server.use("/docs", docsRouter);
server.use("/api/v1/courses", courseRouter);
server.use("/api/v1/jobs", jobRouter);
server.use("/api/v1/skills", skillRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/mentorships", mentorshipRouter);
server.use("/api/v1/posts", postRouter);

server.get("/", (req, res) => {
  return res.status(httpStatus.OK).send({ message: "The Server is running successfully!" });
});

/*-------------------ERROR HANDLING-------------------*/
server.use(notFoundHandler);
server.use(globalErrorHandler);

export { server };
