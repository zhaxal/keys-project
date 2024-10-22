import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { usersCollection, usersSessionsCollection } from "../database";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).send("Login and password are required");
    return;
  }

  const user = await usersCollection.findOne({ login, password });

  if (!user) {
    res.status(401).send("Invalid login or password");
    return;
  }

  const token = uuidv4();

  await usersSessionsCollection.updateOne(
    { userId: user._id },
    {
      $set: {
        updatedAt: new Date(),
        token,
      },
    },
    { upsert: true }
  );

  res.send({ token });
});

authRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send("Token is required");
    return;
  }

  await usersSessionsCollection.deleteOne({ token });

  res.send("Logged out");
});

authRouter.post("/register", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).send("Login and password are required");
    return;
  }

  if (login.length < 3 && typeof login !== "string") {
    res.status(400).send("Login must be a string with at least 3 characters");
    return;
  }

  if (password.length < 6 && typeof password !== "string") {
    res
      .status(400)
      .send("Password must be a string with at least 6 characters");
    return;
  }

  const user = await usersCollection.findOne({ login });

  if (user) {
    res.status(400).send("User already exists");
    return;
  }

  const newUser = await usersCollection.insertOne({
    login,
    password,
    apiToken: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const token = uuidv4();

  await usersSessionsCollection.insertOne({
    userId: newUser.insertedId,
    token,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.send({ token });
});

authRouter.post("/refresh", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send("Token is required");
    return;
  }

  const userSession = await usersSessionsCollection.findOne({
    token,
  });

  if (!userSession) {
    res.status(401).send("Invalid token");
    return;
  }

  await usersSessionsCollection.updateOne(
    { token },
    {
      $set: {
        updatedAt: new Date(),
      },
    }
  );

  res.send("Token refreshed");
});

export default authRouter;
