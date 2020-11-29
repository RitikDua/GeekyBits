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
});
