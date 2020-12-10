const request = require("supertest");
const mongoose = require("mongoose");
const CourseSubItems = require("../../models/courseSubItemModel");

let token = "";
let server;

describe("/courseSubItems", () => {
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
    // await CourseSubItems.collection.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all CourseSubItems", async () => {
      const dbCourseSubItems = [
        {
          subItemType: "Tutorial",
          subItem: "5fad8f085503d91a5f6bd398",
          subItemTitle: "Introduction%20to%20Programming",
        },
        {
          subItemType: "MCQ",
          subItem: "5fad8f085503d91a5f6bd39a",
          subItemTitle: "Introduction%20to%20Programming%20-%201",
        },
      ];

      await CourseSubItems.collection.insertMany(dbCourseSubItems);

      const res = await request(server)
        .get("/courseSubItems")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.courseSubItems).toHaveProperty(
        "subItemType",
        dbCourseSubItems.subItemType
      );
      expect(
        res.body.data.courseSubItems.some(
          (csi) => csi.subItemTitle === "Introduction%20to%20Programming"
        )
      ).toBeTruthy();
      expect(
        res.body.data.courseSubItems.some(
          (csi) =>
            csi.subItemTitle === "Introduction%20to%20Programming%20-%201"
        )
      ).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return subItem if valid id is passed", async () => {
      const prblm = new CourseSubItems({
        subItemType: "Tutorial",
        subItem: "5fad8f085503d91a5f6bd398",
        subItemTitle: "Introduction%20to%20Programming",
      });

      await prblm.save();

      const res = await request(server)
        .get("/courseSubItems/" + prblm._id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.data.courseSubItem).toHaveProperty(
        "subItemTitle",
        prblm.subItemTitle
      );
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server)
        .get("/courseSubItems/1")
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(400);
    });

    it("should return 404 if no subItem with given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/courseSubItems/" + id)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(404);
    });

    it("should return 400 if invalid courseId key is passed", async () => {
      const prblm = new CourseSubItems({
        subItemType: "Tutorial",
        subItem: "5fad8f085503d91a5f6bd398",
        subItemTitle: "Introduction%20to%20Programming",
      });

      await prblm.save();

      const key=123;
      const res = await request(server)
        .get("/courseSubItems/" + prblm._id + "?key=" + key)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(400);
    });
    it("should return 200 if courseId key is valid", async () => {
      const prblm = new CourseSubItems({
        subItemType: "Tutorial",
        subItem: "5fad8f085503d91a5f6bd398",
        subItemTitle: "Introduction%20to%20Programming",
      });

      await prblm.save();

      const key=mongoose.Types.ObjectId();
      const res = await request(server)
        .get("/courseSubItems/" + prblm._id + "?key=" + key)
        .set("authorization", "Bearer " + token);

      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    // Define
    let sub = {};

    const exec = async () => {
      return await request(server)
        .post("/courseSubItems")
        .set("authorization", "Bearer " + token)
        .send(sub);
    };

    beforeEach(() => {
      sub = {
        subItemType: "Tutorial",
        subItem: "5fad8f085503d91a5f6bd398",
        subItemTitle: "Introduction%20to%20Programming",
      };
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 201 and save the courseSubItems if it is valid", async () => {
      const res = await exec();

      const foo = await CourseSubItems.find({
        sub: {
          subItemType: "Tutorial",
          subItem: "5fad8f085503d91a5f6bd398",
          subItemTitle: "Introduction%20to%20Programming",
        },
      });

      expect(foo).not.toBeNull();
      expect(res.status).toBe(201);
    });

    it("should return 400 if courseSubItems details are not valid", async () => {
      sub = {
        ola: "pqrs",
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return the courseSubItems if it is valid", async () => {
      const res = await exec();

      expect(res.body.data.courseSubItem).toHaveProperty("_id");
      expect(res.body.data.courseSubItem).toHaveProperty(
        "subItemTitle",
        "Introduction%20to%20Programming"
      );
    });
  });
});
