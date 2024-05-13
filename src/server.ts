import dotenv from "dotenv";
import z from "zod";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./router";
import publicRouter from "./router/public.router";
import privateRouter from "./router/private.router";
import authMiddleWare from "./middleware/auth.middleware";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", publicRouter);
app.use("/bo", privateRouter);
app.use("/api", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

// const a = z.object({
//   ip: z.string().ip({
//     version: "v4",
//     message: "Invalid IP address",
//   }),
// });

// type A = z.infer<typeof a>;

// const test = {
//   ip: "192.138.1.3",
// };

// a.parse(test);
