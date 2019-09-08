// import Directon from "./index";
// describe("Teat direction modulle", () => {
//   test("It shold", () => {
//     expect(typeof Directon.getTriipSummary).toEqual("object");
//   });
// });
import sum from "./lib/sum";

describe("Test Lib", () => {
  test("add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

/**
If a test is failing,
one of the first things to check should be whether
the test is failing when it's the only test that runs.
In Jest it's simple to run only one test - just temporarily
change that test command to a test.only
*/
// describe("Beneral advice module", () => {
//   test.only("this will be the only test that runs", () => {
//     expect(true).toBe(false);
//   });

//   test("this test will not run", () => {
//     expect("A").toBe("A");
//   });
// });
