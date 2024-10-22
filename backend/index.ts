import express from "express";
import cors from "cors";
import recordsRouter from "./src/routes/recordsRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("KEYS server");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/records", recordsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});