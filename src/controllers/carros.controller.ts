import { Request, Response } from "express";
import fs from "fs";

//devolve todos os carros
export const getAll = async (req: Request, res: Response) => {
  return res.send("okkk");
};

//devolve o carro com o id
export const getById = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;
  //just return same id
  return res.send(id);
};

//cria um carro
export const create = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { id, Marca, Detalhes, Foto } = req.body;
  //envia o carro criado
  return res.status(201).send(req.body);
};

//atualiza o carro
export const update = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { number, name, city, birthday } = req.body;
  //envia o carro alterado
  return res.send(req.body);
};

//apaga o carro com o id
export const deletes = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;
  //devolve ok
  return res.send("ok");
};
