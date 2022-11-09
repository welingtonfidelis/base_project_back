import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import  'express-async-errors';

import { router } from "./route";

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT || port, function () {
  console.log(`Server running in ${port}\n`);
});
