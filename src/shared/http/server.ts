import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import { pagination } from "typeorm-pagination";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import uploadConfig from "@config/upload";
import rateLimiter from "./middlewares/rateLimiter";

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use(pagination);
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

// middleware de erro para o código limpo sem try catch
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("server started on port 3333! 🏆");
});
