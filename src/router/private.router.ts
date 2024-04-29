import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("/templates/private/table.template.html", { root: "." });
});

export default router;
