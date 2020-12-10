const Attempts = require("../../models/attemptModel");
const request = require("supertest");
const mongoose = require("mongoose");

let token = "";
let server;

describe("/attempts", () => {
  beforeEach(async () => {
    server = require("../../server");
    const res = await request(server).post("/users/login").send({
      email: "user@example.com",
      password: "pikaboo.007",
    });
    token = res.body.data.token;
  });

  afterEach(async () => {
    await server.close();
    // await Attempts.collection.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all contests", async () => {
      const dbAttempt = [
        {
          _id: new mongoose.Types.ObjectId().toHexString(),
          testCasesPassed: [true],
          testCasesUserOutputs: ["Hello GeekyBits"],
          attemptType: "CodingProblem",
          attemptString:
            '#include<stdio.h>\n\nint main() {\n    // Your Code will come here\n    printf("Hello GeekyBits");\n    return 0;\n}\n',
          problem: { _id: new mongoose.Types.ObjectId().toHexString() },
          user: { _id: new mongoose.Types.ObjectId().toHexString() },
          subItem: { _id: new mongoose.Types.ObjectId().toHexString() },
          attemptTitle: "Hello GeekyBits",
          attemptResult: "correct",
          attemptLanguage: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      ];

      await Attempts.collection.insertMany(dbAttempt);

      const res = await request(server)
        .get("/attempts")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.attempts).toHaveProperty(
        "attemptType",
        dbAttempt.attemptType
      );
    });
  });

  describe("GET /:id", () => {
    it("should return attempts if valid id is passed", async () => {
      const bar = new Attempts({
        _id: new mongoose.Types.ObjectId().toHexString(),
        testCasesPassed: [true],
        testCasesUserOutputs: ["Hello GeekyBits"],
        attemptType: "CodingProblem",
        attemptString:
          '#include<stdio.h>\n\nint main() {\n    // Your Code will come here\n    printf("Hello GeekyBits");\n    return 0;\n}\n',
        problem: { _id: new mongoose.Types.ObjectId().toHexString() },
        user: { _id: new mongoose.Types.ObjectId().toHexString() },
        subItem: { _id: new mongoose.Types.ObjectId().toHexString() },
        attemptTitle: "Hello GeekyBits",
        attemptResult: "correct",
        attemptLanguage: "C",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      });

      await bar.save();

      const res = await request(server)
        .get("/attempts/" + bar._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/attempts/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(400);
    });
  });
});
