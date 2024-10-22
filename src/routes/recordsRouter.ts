import { Router } from "express";

const recordsRouter = Router();

recordsRouter.get("/", (req, res) => {
  res.send("Records");
});

export default recordsRouter;