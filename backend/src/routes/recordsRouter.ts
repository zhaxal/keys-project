import { Router } from "express";

import { recordsCollection, usersSessionsCollection } from "../database";

const recordsRouter = Router();

recordsRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userSession = await usersSessionsCollection.findOne({ token });

  if (!userSession) {
    res.status(401).send("Unauthorized");
    return;
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (isNaN(page) || page <= 0) {
    res.status(400).send("Invalid page number");
    return;
  }

  if (isNaN(limit) || limit <= 0) {
    res.status(400).send("Invalid limit number");
    return;
  }

  const skip = (page - 1) * limit;

  const records = await recordsCollection
    .find({ userId: userSession.userId })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalRecords = await recordsCollection.countDocuments({
    userId: userSession.userId,
  });
  const totalPages = Math.ceil(totalRecords / limit);

  res.send({
    page,
    limit,
    totalPages,
    totalRecords,
    records,
  });
});

export default recordsRouter;
