import { Request, Response } from "express";
import fs from "fs";
import Carro from "@/types/car";

//devolve todos os carros
export const getAll = async (req: Request, res: Response) => {
  const jsonFile = fs.readFileSync("static/data/local/data.json", "utf-8");
  return res.status(200).send(JSON.parse(jsonFile));
};

//devolve o carro com o id
export const getById = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;

  const jsonFile = fs.readFileSync("static/data/local/data.json", "utf-8");
  const dataJson = JSON.parse(jsonFile);

  let car: Carro | undefined = dataJson.carros.find(
    (carro: Carro) => carro.id === id
  );
  if (!car) {
    return res.status(404).send("Carro não encontrado");
  }
  //just return same id
  return res.send(car);
};

//cria um carro
export const create = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { id, Marca, Detalhes, Foto } = req.body;
  const jsonFile = fs.readFileSync("static/data/local/data.json", "utf-8");
  const dataJson = JSON.parse(jsonFile);
  let size = dataJson.carros.length;
  const newCar = { id, Marca, Detalhes, Foto };
  dataJson.carros.push(newCar);
  fs.writeFileSync("static/data/local/data.json", JSON.stringify(dataJson));
  //envia o carro criado
  return res.status(201).send(newCar);
};

//atualiza o carro
export const update = async (req: Request, res: Response) => {
  //obter o carro pelas características enviadas
  const { id, Marca, Detalhes, Foto } = req.body;
  const jsonFile = fs.readFileSync("static/data/local/data.json", "utf-8");
  const dataJson = JSON.parse(jsonFile);
  const editedCar = dataJson.carros.find((carro: Carro) => carro.id === id);
  if (!editedCar) {
    return res.status(404).send("Carro não encontrado");
  }
  editedCar.Marca = Marca;
  editedCar.Detalhes = Detalhes;
  editedCar.Foto = Foto;

  const carros = dataJson.carros.map((carro: Carro) => {
    if (carro.id === id) {
      carro = editedCar;
    }
    return carro;
  });
  dataJson.carros = carros;
  fs.writeFileSync("static/data/local/data.json", JSON.stringify(dataJson));
  //envia o carro alterado
  return res.send();
};

//apaga o carro com o id
export const deletes = async (req: Request, res: Response) => {
  //obter o id do carro
  const id = req.params.id;
  const jsonFile = fs.readFileSync("static/data/local/data.json", "utf-8");
  const dataJson = JSON.parse(jsonFile);
  const carros = dataJson.carros.filter((carro: Carro) => carro.id !== id);
  dataJson.carros = carros;
  let carro = dataJson.carros.find((carro: Carro) => carro.id === id);
  if (carro) {
    return res.status(400).send("Erro ao apagar o carro");
  }
  fs.writeFileSync("static/data/local/data.json", JSON.stringify(dataJson));
  //devolve ok
  return res.status(200).send("Carro apagado com sucesso");
};
