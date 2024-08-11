import "reflect-metadata";
import express from "express";
import cors from "cors";

import "./database/connect";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3050, () =>
  console.log("🔥 Server is running at http://localhost:3050")
);
