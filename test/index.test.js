var assert = require("assert");

const { calcDiscId, calcDiscIdByOffsets } = require("../src");

describe("CDDB DiscId Calculator", function() {
  describe("#calcDiscId()", function() {
    it("should return 310acf04 for sample 1", function() {
      const discId = calcDiscId([549.77,934.83,762.79,519.61]);
      console.log(discId);
      assert.equal(discId, "310acf04");
    });
    it("should return d110b310 for sample 2", function() {
      const discId = calcDiscId([330.28,308.84,398.76,270.19,200.65,183.96,286.16,140.91,207.21,151.09,358.2,328.52,194.36,319.81,311.09,284.96]);
      assert.equal(discId, "d110b310");
    });
    it("should return null if input array is empty", function () {
      const discId = calcDiscId([]);
      assert.equal(discId, null);
    });
    it("should return null if input is not an array", function () {
      const discId = calcDiscId({});
      assert.equal(discId, null);
    });
  });

  describe("#calcDiscIdByOffsets()", function() {
    it("should return 310acf04 for sample 1", function() {
      const discId = calcDiscIdByOffsets([150,41383,111495,168704], 2769);
      assert.equal(discId, "310acf04");
    });
    it("should return d110b310 for sample 2", function() {
      const discId = calcDiscIdByOffsets([150,24921,48084,77991,98255,113304,127101,148563,159131,174672,186004,212869,237508,252085,276071,299403], 4277);
      assert.equal(discId, "d110b310");
    });
    it("should return null if input array is empty", function () {
      const discId = calcDiscIdByOffsets([]);
      assert.equal(discId, null);
    });
    it("should return null if input is not an array", function () {
      const discId = calcDiscIdByOffsets({});
      assert.equal(discId, null);
    });
    it("should return null if first element is not 150", function () {
      const discId = calcDiscIdByOffsets([1]);
      assert.equal(discId, null);
    });
  });
});