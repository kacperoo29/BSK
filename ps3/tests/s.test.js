 
const matrix_cipher_a_for_testing = require('../public/ex_2.js');

describe("helloWorld", () => {
    it("returns hello world", () => {
      expect(matrix_cipher_a_for_testing("sa", "1-2")).toBe("hello world");
    });
  });