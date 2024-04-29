import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("/templates/public/page.template.html", { root: "." });
});

export default router;
