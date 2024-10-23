import { Router } from "express";

import { usersCollection, usersSessionsCollection } from "../database";

const userRouter = Router();

userRouter.get("/apiToken", async (req, res) => {
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

  const user = await usersCollection.findOne({ _id: userSession.userId });

  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }

  res.send({
    apiToken: user.apiToken,
  });
});

export default userRouter;
