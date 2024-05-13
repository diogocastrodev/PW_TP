import { NextFunction, Request, Response } from "express";
import { certifyAccessToken } from "@/utils/jwt.util";

export default async function authMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers["authorization"]; // req.headers['x-access-token'];
  if (!accessToken) {
    return res.status(401).send("Não está autorizado");
  }

  try {
    const bearer = accessToken.split(" ");
    const bearerToken = bearer[1];

    const result = await certifyAccessToken(bearerToken);
    req.body.loggedUserName = result.name;

    return next();
  } catch (err) {
    return res.status(401).send("Não está autorizado");
  }
}
