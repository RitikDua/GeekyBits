const request = require("supertest");

let server;

describe("/users", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(() => {
    server.close();
  });

  it("Should register correctly and return token", async () => {
    const res = await request(server).post("/users/signup").send({
      name: "ritik",
      email: "rd@example.com",
      password: "rd123",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.token).toBeDefined();
  });

  it("Should return an error for existing user", async () => {
    const res = await request(server).post("/users/signup").send({
      name: "ritik",
      email: "rd@example.com",
      password: "rd123",
    });

    expect(res.status).toBe(400);
  });

  it("Should return token on login", async () => {
    const res = await request(server).post("/users/login").send({
      email: "rd@example.com",
      password: "rd123",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.token).toBeDefined();
  });

  it("Should return error on wrong credentials login", async () => {
    var res = await request(server).post("/users/login").send({
      email: "user69@example.com",
      password: "pikaboo.007",
    });

    expect(res.status).toBe(401);

    var res = await request(server).post("/users/login").send({
      email: "user@example.com",
      password: "pikachoo.007",
    });

    expect(res.status).toBe(401);

    var res = await request(server).post("/users/login").send({
      email: "user69@example.com",
      password: "pikachoo.007",
    });

    expect(res.status).toBe(401);
  });
});
