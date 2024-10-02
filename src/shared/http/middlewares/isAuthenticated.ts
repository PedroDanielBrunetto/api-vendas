import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  // Desestruturando o token e pegando a segunda parte do array: "Bearer token" => [Bearer, token] => token
  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    // disponibilizando o id em toda request que utilizar o middleware
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token.");
  }
}
