import { Request, Response } from "express";
import fs from "fs";
import Carro from "@/types/car";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

//devolve todos os carros
export const getAll = async (req: Request, res: Response) => {
  const data = await prisma.carro.findMany();
  return res.status(200).send(data);
};

//devolve o carro com o id
export const getById = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;

  const data = await prisma.carro
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Erro ao buscar carro");
    });

  if (!data) {
    return res.status(404).send("Carro não encontrado");
  }

  //just return same id
  return res.send(data);
};

//cria um carro
export const create = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { id, Marca, Detalhes, Foto } = req.body;
  const data = await prisma.carro
    .create({
      data: {
        Marca: Marca,
        Detalhes: Detalhes,
        Foto: Foto,
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Erro ao criar carro");
    });
  //envia o carro criado
  return res.status(201).send(data);
};

//atualiza o carro
export const update = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { id, Marca, Detalhes, Foto } = req.body;
  const data = await prisma.carro
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        Marca: Marca,
        Detalhes: Detalhes,
        Foto: Foto,
      },
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Erro ao editar carro");
    });
  //envia o carro alterado
  return res.send(data);
};

//apaga o carro com o id
export const deletes = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;
  try {
    const data = await prisma.carro
      .deleteMany({
        where: {
          id: parseInt(id),
        },
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send("Erro ao apagar carro");
      });
    if (!data) {
      return res.status(404).send("Carro não encontrado");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Erro ao apagar carro");
  }
  //devolve ok
  return res.status(200).send("Carro apagado com sucesso");
};
