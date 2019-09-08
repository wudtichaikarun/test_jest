import mongoose from "mongoose";
import "dotenv/config";

describe(" test insert data", () => {
  let connection;
  let db;

  const dbHost = process.env.__MONGO_URI__;
  const dbName = process.env.__MONGO_DB_NAME__;

  console.log(dbHost, dbName);

  beforeAll(async () => {
    connection = await mongoose.connect(`mongodb://${dbHost}/${dbName}`, {
      useNewUrlParser: true
    });
    db = await mongoose.connection;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");
    const mockUser = { name: "John" };
    const result = await users.insertOne(mockUser);

    const insertedUser = await users.findOne(mockUser);
    expect(insertedUser).toEqual(mockUser);
  });

  it("should delete a doc into collection", async () => {
    const users = db.collection("users");
    const mockUser = { name: "John" };
    await users.deleteOne(mockUser);

    const result = await users.findOne(mockUser);
    expect(result).toBeNull();
  });
});
