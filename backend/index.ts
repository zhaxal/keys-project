import express from "express";
import cors from "cors";

import authRouter from "./src/routes/authRouter";
import userRouter from "./src/routes/userRouter";
import recordsRouter from "./src/routes/recordsRouter";

import recordsRouterApi from "./src/routes/api/recordsRouter";

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

app.use("/api/records", recordsRouterApi);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/records", recordsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
