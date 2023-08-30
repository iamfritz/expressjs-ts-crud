const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* use to test view/update/delete */
let newItem_ID = '';

describe("POST /api/todo", () => {
  it("should create a todo item", async () => {
    const res = await request(app).post("/api/todo").send({
      title: "New Todo 1",
      description: "Description 1",
      level: "low",
      status: "open",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("New Todo 1");
    newItem_ID = res.body.data._id;
  });
});

describe("GET /api/todo", () => {
  it("should return all todo items", async () => {
    const res = await request(app).get("/api/todo");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
  });
});

describe("GET /api/todo/:id", () => {
  it("should return a todo item", async () => {
    const res = await request(app).get(`/api/todo/${newItem_ID}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("New Todo 1");
  });
});

describe("PUT /api/todo/update/:id", () => {
  it("should update a todo", async () => {
    const res = await request(app)
      .patch(`/api/todo/update/${newItem_ID}`)
      .send({
        title: "Update Todo 1",
        description: "Description 1",
        level: "medium",
        status: "completed",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Update Todo 1");
  });
});

describe("DELETE /api/todo/delete/:id", () => {
  it("should delete a todo", async () => {
    const res = await request(app).delete(`/api/todo/delete/${newItem_ID}`);
    expect(res.statusCode).toBe(200);
  });
});