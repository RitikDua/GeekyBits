const ccd = require("../../../middlewares/CompileCode");
const Users = require("../../../models/userModel");

describe("Compile Code Middleware", () => {
  it("should execute the code", async () => {
    try {
      ccd.executeCode = jest.fn();

      ccd.executeCode.mockResolvedValue({
        err: false,
        output: "Hello World",
      });

      const result = await ccd.executeCode();
      expect(result).toHaveBeenCalled();
      expect(ccd.executeCode.mock.calls[0][0]).toBe("Hello World");
      expect(ccd.executeCode.mock.calls[0][1]).toBe(1);
    } catch (error) {
      console.log("Something goes terribly wrong!");
    }
  });

  it("should throw error for wrong code", async () => {
    try {
      ccd.executeCode = jest.fn();

      ccd.executeCode.mockRejectedValue(new Error("EXECUTION FAILED"));

      const result = await ccd.executeCode();

      expect(result).toHaveBeenCalled();
      expect(result).toThrow(Error);
    } catch (error) {
      console.log(error.message);
    }
  });

  it("should save the file", async () => {
    try {
      ccd.saveFile = jest.fn();

      ccd.saveFile.mockResolvedValue("The file was saved!");

      const result = await ccd.saveFile();
      expect(result).toHaveBeenCalled();
      expect(ccd.saveFile.mock.calls[0][0]).toBe("Hello World");
      expect(ccd.saveFile.mock.calls[0][1]).toBe(1);
    } catch (error) {
      console.log("Something goes terribly wrong!");
    }
  });

  it("should throw error for not saving file", async () => {
    try {
      ccd.saveFile = jest.fn();

      ccd.saveFile.mockRejectedValue(new Error("Internal Server Error!"));

      const result = await ccd.saveFile();

      expect(result).toHaveBeenCalled();
      expect(result).toThrow(Error);
    } catch (error) {
      console.log(error.message);
    }
  });

});
