const Contests = require('../../models/contestModel');
const request = require("supertest");
const mongoose = require("mongoose");

let token = "";
let server;

describe("/contests", () => {
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
    await Contests.collection.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all contests", async () => {
      const dbContest = [{
            "users": [
              {"_id":new mongoose.Types.ObjectId().toHexString()},
              {"_id":new mongoose.Types.ObjectId().toHexString()}
            ],
            "attempts": [
              {"_id":new mongoose.Types.ObjectId().toHexString()},
              {"_id":new mongoose.Types.ObjectId().toHexString()}
            ],
            "problem": {
              "_id":new mongoose.Types.ObjectId().toHexString()
            },
            "contestUrl": "5b1867fb-3e2f-4b3f-b5f3-e96b71945a8b",
            "startedAt":new Date(),
            "endedAt":new Date(),
            "winner": {
                "_id":new mongoose.Types.ObjectId().toHexString()
            }
        }];

      await Contests.collection.insertMany(dbContest);

      const res = await request(server)
        .get("/contests")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.contests).toHaveProperty("users", dbContest.users);
    });
  });

  describe("GET /:id", () => {
    it("should return contest if valid id is passed", async () => {
      const bar = new Contests({
        "users": [
          {"_id":new mongoose.Types.ObjectId().toHexString()},
          {"_id":new mongoose.Types.ObjectId().toHexString()}
        ],
        "attempts": [
          {"_id":new mongoose.Types.ObjectId().toHexString()},
          {"_id":new mongoose.Types.ObjectId().toHexString()}
        ],
        "problem": {
          "_id":new mongoose.Types.ObjectId().toHexString()
        },
        "contestUrl": "5b1867fb-3e2f-4b3f-b5f3-e96b71945a8b",
        "startedAt":new Date(),
        "endedAt":new Date(),
        "winner": {
            "_id":new mongoose.Types.ObjectId().toHexString()
        }
    });

      await bar.save();

      const res = await request(server)
        .get("/contests/" + bar._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.contest).toHaveProperty("contestUrl", bar.contestUrl);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/contests/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });

    it("should return 404 if no contest with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/contests/" + id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });
  });

});