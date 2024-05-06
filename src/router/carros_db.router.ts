import express from "express";
import * as carroController from "../controllers/carros_db.controller";

const router = express.Router();

router.get("/", carroController.getAll);
router.get("/:id", carroController.getById);
router.post("/create", carroController.create);
router.put("/update", carroController.update);
router.delete("/delete/:id", carroController.deletes);

export default router;
