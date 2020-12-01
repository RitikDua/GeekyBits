const request = require("supertest");
const mongoose = require("mongoose");
const cp = require("./../../models/codingProblemModel");

let token = "";
let server;

describe("/codingProblems", () => {
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
    await cp.collection.deleteMany({});
  });


  describe("GET /", () => {
    it("should return all problems", async () => {
      await cp.collection.insertMany([
        {
            "problemTitle": "Add%20two%20numbers",
            "problemStatement": "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
            "testCases": [
                "1%202",
                "10%2012"
            ],
            "correctOutput": [
                "3",
                "22"
            ]
        },
        {
            "problemTitle": "Area%20and%20Perimeter%20of%20a%20rectangle",
            "problemStatement": "Write%20a%20program%20to%20calculate%20the%20area%20and%20perimeter%20of%20a%20rectangle.",
            "testCases": [
                "10%2020",
                "17%2010"
            ],
            "correctOutput": [
                "200%2060",
                "170%2054"
            ]
        }
    ]);

      const res = await request(server)
        .get("/codingProblems")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id", () => {

    it("should return coding Problem if valid id is passed", async () => {
      const prblm = new cp({
        "problemTitle": "Add%20two%20numbers",
        "problemStatement": "Given%20two%20numbers%2C%20add%20them%20and%20print%20their%20sum",
        "testCases": [
            "1%202",
            "10%2012"
        ],
        "correctOutput": [
            "3",
            "22"
        ]
    });
      await prblm.save();

      const res = await request(server)
        .get("/codingProblems/" + prblm._id)
        .set("authorization", "Bearer " + token);
        
      expect(res.status).toBe(200);
      expect(res.body.data.codingProblem).toHaveProperty("problemTitle", prblm.problemTitle);
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
});
