const request = require("supertest");
const mongoose = require("mongoose");
const MCQ = require("./../../models/mcqModel");

let token = "";
let server;

describe("/mcqs", () => {
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
    // await MCQ.collection.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all mcqs", async () => {
      const dbMcq = [
        {
          mcqTitle: "Introduction to Programming - 1",
          mcqStatement:
            "A%20__________%20is%20a%20set%20of%20instructions%20that%20a%20computer%20follows%20to%20perform%20a%20task.",
          options: [
            "Compiler",
            "Program",
            "Interpreter",
            "Programming Language",
          ],
          answer: "Program",
        },
        {
          mcqTitle: "Introduction to Programming - 2",
          mcqStatement:
            "The%20__________%20translates%20an%20assembly%20language%20program%20to%20",
          options: ["Assembler", "Compiler", "Translator", "Interpreter"],
          answer: "Assembler",
        },
      ];

      await MCQ.collection.insertMany(dbMcq);

      const res = await request(server)
        .get("/mcqs")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.mcqs).toHaveProperty("mcqTitle", dbMcq.mcqTitle);
      expect(res.body.data.mcqs.some(m => m.mcqTitle === "Introduction to Programming - 1")).toBeTruthy();
      expect(res.body.data.mcqs.some(m => m.mcqTitle === "Introduction to Programming - 2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return mcq if valid id is passed", async () => {
      const prblm = new MCQ({
        mcqTitle: "Introduction to Programming - 2",
        mcqStatement:
          "The%20__________%20translates%20an%20assembly%20language%20program%20to%20",
        options: ["Assembler", "Compiler", "Translator", "Interpreter"],
        answer: "Assembler",
      });

      await prblm.save();

      const res = await request(server)
        .get("/mcqs/" + prblm._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.mcq).toHaveProperty("mcqTitle", prblm.mcqTitle);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/mcqs/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });

    it("should return 404 if no mcq with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/mcqs/" + id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define
    let mul={};

    const exec = async () => {
      return await request(server)
        .post("/mcqs")
        .set("authorization", "Bearer " + token)
        .send(mul);
    };

    beforeEach(() => {
      mul = {
        mcqTitle: "Introduction to Programming - 2",
        mcqStatement:
          "The%20__________%20translates%20an%20assembly%20language%20program%20to%20",
        options: ["Assembler", "Compiler", "Translator", "Interpreter"],
        answer: "Assembler",
      };
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 201 and save the mcq if it is valid", async () => {
      const res=await exec();

      const foo = await MCQ.find({
        mul: {
          mcqTitle: "Introduction to Programming - 2",
          mcqStatement:
            "The%20__________%20translates%20an%20assembly%20language%20program%20to%20",
          options: ["Assembler", "Compiler", "Translator", "Interpreter"],
          answer: "Assembler",
        },
      });

      expect(foo).not.toBeNull();
      expect(res.status).toBe(201);
    });

    it("should return 400 if mcq details are not valid", async () => {
      mul = {
        abc:"xyz123"
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return the mcq if it is valid', async() => { 
      const res = await exec();

      expect(res.body.data.mcq).toHaveProperty('_id');
      expect(res.body.data.mcq).toHaveProperty("mcqTitle","Introduction to Programming - 2");      
    });
  });
});
