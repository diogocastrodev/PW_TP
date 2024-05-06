import express from "express";
import carrosRoute from "./carros.router";
import carrosDBRoute from "./carros_db.router";

const router = express.Router();

router.use("/carros", carrosRoute);
router.use("/carrosdb", carrosDBRoute);

export default router;
