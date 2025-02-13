import express from "express";
import defaultRoutes from "./routes/default";
import pdfRoutes from "./routes/pdf";
import swaggerDocs from "./swagger";
import { SERVER_PORT } from "./constants/app";
import { defaultErrorHandler } from "./handlers/default";
import { zodErrorHandler } from "./handlers/zod";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(swaggerDocs);

app.use("/", defaultRoutes);
app.use("/", pdfRoutes);

app.use(zodErrorHandler);
app.use(defaultErrorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
