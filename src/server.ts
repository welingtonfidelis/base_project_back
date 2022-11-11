import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import { router } from "./route";
import { config } from "./config";

const { PORT } = config;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

app.listen(PORT, function () {
  console.log(`Server running in ${PORT}\n`);
});
