import express from "express";
import carrosRoute from "./carros.router";

const router = express.Router();

router.use("/carros", carrosRoute);

export default router;
