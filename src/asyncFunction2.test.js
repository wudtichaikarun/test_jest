import asyncFn from "./async-await";

describe("Async function 2", () => {
  // callback done คือ fn ที่ ใช้บอกว่า functin ที่ test เป็น async
  it("Async test demo", done => {
    setTimeout(() => {
      expect(1).toBe(1);
      done();
    }, 2000);
  });

  it("Should add two numbers", done => {
    asyncFn.add(2, 3).then(sum => {
      expect(sum).toBe(5);
      done();
    });
  });

  it("Should add two numbers async/await", async () => {
    const sum = await asyncFn.add(10, 22);
    expect(sum).toBe(32);
  });
});
