import express from "express";
import carrosRoute from "./carros.router";
import carrosDBRoute from "./carros_db.router";
import authRoute from "./auth.router";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/carros", carrosRoute);
router.use("/carrosdb", carrosDBRoute);

export default router;
