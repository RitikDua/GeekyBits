const request = require("supertest");
const mongoose = require("mongoose");
const CodingProblem = require("./../../models/codingProblemModel");

let token = "";
let server;

describe("/codingProblems", () => {
  beforeEach(async () => {
    server = require("../../server");
    const res = await request(server)
      .post("/users/login")
      .send({
        email: "user@example.com",
        password: "pikaboo.007",
      });
    token = res.body.data.token;
  });

  afterEach(async () => {
    await server.close();
    await CodingProblem.collection.deleteMany({});
  });

  describe("GET /", () => {

    it("should return all problems", async () => {
      const codes = [
        {
          problemTitle: "Add%20two%20numbers",
          problemStatement:
            "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
          testCases: ["1%202", "10%2012"],
          correctOutput: ["3", "22"],
        },
        {
          problemTitle: "Area%20and%20Perimeter%20of%20a%20rectangle",
          problemStatement:
            "Write%20a%20program%20to%20calculate%20the%20area%20and%20perimeter%20of%20a%20rectangle.",
          testCases: ["10%2020", "17%2010"],
          correctOutput: ["200%2060", "170%2054"],
        },
      ];

      await CodingProblem.collection.insertMany(codes);

      const res = await request(server)
        .get("/codingProblems")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.codingProblems).toHaveProperty(
        "problemTitle",
        codes.problemTitle
      );
    });
  });

  describe("GET /:id", () => {
    it("should return coding Problem if valid id is passed", async () => {
      const prblm = new CodingProblem({
        problemTitle: "Add%20two%20numbers",
        problemStatement:
          "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
        testCases: ["1%202", "10%2012"],
        correctOutput: ["3", "22"],
      });

      await prblm.save();

      const res = await request(server)
        .get("/codingProblems/" + prblm._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.codingProblem).toHaveProperty(
        "problemTitle",
        prblm.problemTitle
      );
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/codingProblems/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });

    it("should return 404 if no coding Problem with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/codingProblems/" + id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define
    let code;

    const exec = async () => {
      return await request(server)
        .post("/codingProblems")
        .set("authorization", "Bearer " + token)
        .send({ code });
    };

    beforeEach(() => {
      code = {
        problemTitle: "Add%20two%20numbers",
        problemStatement:
          "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
        testCases: ["1%202", "10%2012"],
        correctOutput: ["3", "22"],
      };
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should save the code if it is valid", async () => {
      await exec();

      const cp = await CodingProblem.find({ code:{
        problemTitle: "Add%20two%20numbers",
        problemStatement:
          "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
        testCases: ["1%202", "10%2012"],
        correctOutput: ["3", "22"],
      } });

      expect(cp).not.toBeNull();
    });

    it("should return the code if it is valid", async () => {
      const res = await exec();

      expect(res.body.data.codingProblem).toHaveProperty("_id");
    });

    it('should return 400 if problem details are not valid',async () =>{
      code=1234;

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});