const path = require("path");
const DataLoader = require("../services/DataLoader");

describe("DataLoader", () => {
  describe("prepareOutput", () => {
    it("should prepare data successfully", () => {
      // Load test fixtures
      const connections = require(path.resolve(
        __dirname,
        "resources/connections.json"
      ));
      const resources = require(path.resolve(
        __dirname,
        "resources/resources.json"
      ));
      const scans = require(path.resolve(__dirname, "resources/scans.json"));

      // Create an instance of DataLoader with test fixtures
      const dataLoader = new DataLoader(connections, resources, scans);

      // Call the prepareOutput method
      const result = dataLoader.prepareOutput();

      // Expect the result to be true, indicating success
      expect(result).toBe(true);

      // Additional assertions if needed based on your logic
      // For example, you might want to check if repositories and images are populated
      expect(dataLoader.repositories).toBeInstanceOf(Array);
      expect(dataLoader.repositories).not.toHaveLength(0);
      expect(dataLoader.images).toBeInstanceOf(Array);
      expect(dataLoader.images).not.toHaveLength(0);
    });
  });
});
