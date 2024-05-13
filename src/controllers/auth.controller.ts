import bcrypt from "bcrypt";
import { generateAccessToken, certifyAccessToken } from "@/utils/jwt.util";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      var passwordIsValid = password == user.password;
      if (passwordIsValid) {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        const accessToken = generateAccessToken({
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
        res.status(200).json({ name: user.name, token: accessToken });
      } else {
        res.status(401).json({ msg: "Password inválida!" });
      }
    }
  } catch (error: Error | any) {
    res.status(401).json({ msg: error.message });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password, isAdmin } = req.body;
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: bcrypt.hashSync(password, 8),
        isAdmin: isAdmin,
      },
    });
    return signin(req, res);
  } catch (error: Error | any) {
    res.status(401).json({ msg: error.message });
  }
}

export async function readToken(req: Request, res: Response) {
  try {
    const { token } = req.body;
    certifyAccessToken(token)
      .then((decode) => {
        res.status(200).json(decode);
        // Aqui pode ler os dados decodificados do token
        // Faça o que quiser com os dados decodificados, como salvá-los em variáveis ou usar em outras operações
      })
      .catch((err) => {
        res.status(401).json(err);
        //console.error('Erro ao verificar o token:', err);
      });
  } catch (error: Error | any) {
    res.status(401).json({ msg: error.message });
  }
}
