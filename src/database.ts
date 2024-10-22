import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
client.connect();
const db = client.db(process.env.DB_NAME || "keys-database");

interface Records {
  createdAt: Date;
  updatedAt: Date;
  humidity: number;
  temperature: number;
  userId: ObjectId;
}

export const recordsCollection = db.collection<Records>("records");

interface Users {
  createdAt: Date;
  updatedAt: Date;
  login: string;
  password: string;
  apiToken: string;
}

export const usersCollection = db.collection<Users>("users");

interface UsersSessions {
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId;
  token: string;
}

export const usersSessionsCollection =
  db.collection<UsersSessions>("usersSessions");
