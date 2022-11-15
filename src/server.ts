import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import { router } from "./route";
import { config } from "./config";

const { PORT, CORS_DOMAINS } = config;

const corsOptions = {
  origin: CORS_DOMAINS.split(",").map((item) => item.trim()),
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(router);

app.listen(PORT, function () {
  console.log(`Server running in ${PORT}\n`);
});
