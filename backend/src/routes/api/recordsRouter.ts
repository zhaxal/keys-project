import { Router } from "express";

import { recordsCollection, usersCollection } from "../../database";

const recordsRouter = Router();

recordsRouter.get("/", async (req, res) => {
  const apiToken = req.query.apiToken as string;

  if (!apiToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  const user = await usersCollection.findOne({ apiToken });

  if (!user) {
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
    .find({ userId: user._id })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalRecords = await recordsCollection.countDocuments({
    userId: user._id,
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

interface CreateRecordBody {
  humidity: number;
  temperature: number;
  deviceTime: string;
}

recordsRouter.post("/", async (req, res) => {
  const apiToken = req.query.apiToken as string;

  if (!apiToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  const user = await usersCollection.findOne({ apiToken });

  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  const body = req.body as CreateRecordBody;

  if (typeof body.humidity !== "number" || body.humidity < 0) {
    res.status(400).send("Invalid humidity");
    return;
  }

  if (typeof body.temperature !== "number" || body.temperature < -273.15) {
    res.status(400).send("Invalid temperature");
    return;
  }

  if (typeof body.deviceTime !== "string") {
    res.status(400).send("Invalid deviceTime");
    return;
  }

  const deviceTime = new Date(body.deviceTime);

  if (isNaN(deviceTime.getTime())) {
    res.status(400).send("Invalid deviceTime");
    return;
  }

  await recordsCollection.insertOne({
    createdAt: new Date(),
    updatedAt: new Date(),
    humidity: body.humidity,
    temperature: body.temperature,
    deviceTime,
    userId: user._id,
  });
  res.send("Record created");
});

recordsRouter.post("/bulk", async (req, res) => {
  const apiToken = req.query.apiToken as string;

  if (!apiToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  const user = await usersCollection.findOne({ apiToken });

  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const body = req.body as CreateRecordBody[];

  if (!Array.isArray(body)) {
    res.status(400).send("Invalid body");
    return;
  }

  if (body.length === 0) {
    res.status(400).send("Empty body");
    return;
  }

  for (const record of body) {
    if (typeof record.humidity !== "number" || record.humidity < 0) {
      res.status(400).send("Invalid humidity");
      return;
    }

    if (
      typeof record.temperature !== "number" ||
      record.temperature < -273.15
    ) {
      res.status(400).send("Invalid temperature");
      return;
    }

    if (typeof record.deviceTime !== "string") {
      res.status(400).send("Invalid deviceTime");
      return;
    }

    const deviceTime = new Date(record.deviceTime);

    if (isNaN(deviceTime.getTime())) {
      res.status(400).send("Invalid deviceTime");
      return;
    }
  }

  const records = body.map((record) => ({
    createdAt: new Date(),
    updatedAt: new Date(),
    humidity: record.humidity,
    temperature: record.temperature,
    deviceTime: new Date(record.deviceTime),
    userId: user._id,
  }));

  await recordsCollection.insertMany(records);

  res.send("Records created");
});

export default recordsRouter;
