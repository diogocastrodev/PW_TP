import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("/templates/public/page.template.html", { root: "." });
});

router.get("/signup", (req, res) => {
  res.sendFile("/templates/auth/signup.template.html", { root: "." });
});
router.get("/signin", (req, res) => {
  res.sendFile("/templates/auth/signin.template.html", { root: "." });
});

export default router;
