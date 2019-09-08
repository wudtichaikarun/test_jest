import fetch from "node-fetch";
import swapi from "./lib/async";
import axios from "axios";
import Users from "./lib/users";

jest.mock("axios");

/**
 *  What is the difference between 'it' and 'test' in jest ?
 *  'it' is an alias of 'test'. So they are exactly the same
 */
describe("Async function", () => {
  // TEST1
  it("calls swapi to get people", () => {
    // นับจำนวน expect() ของ test นี้
    // expect.assertions(1);

    /* ต้องใช้ประโยค return เพราะ .getPeople()
    เป็น async ถ้าไม่ return expect.assertions(1)
    จะไม่สามารถทำงานได้
  */
    return swapi.getPeople(fetch).then(data => {
      expect(data.count).toEqual(87);
    });
  });

  // TEST2
  // it('calls swapi to get people with a promise', () => {
  //   expect.assertions(2);

  //   return swapi
  //     .getPeoplePromise(fetch)
  //     .then(data => {
  //       expect(data.count).toEqual(87);
  //       expect(
  //         data.results.length
  //       ).toBeGreaterThan(5);
  //     });
  // });

  /* เนื่องจาก fetch เป็น async ซึ่งถ้ามีหลายๆ test เรียกใช้
   มันจtทำงานช้าจึงสร้าง fetch ปลอมขึ้นมา ชื่อ mockFetch
   ใช้งานแทน TEST2
*/
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 87,
          // สร้างปลอมมา จะต้องไปใส่ใน function async.js ด้วย เพราะเป็นคน return ค่า
          data: "romantic",
          results: [0, 1, 2, 3, 4, 5]
        })
    })
  );

  it("getPeople returns count and results", () => {
    /**
     *  expect.assertions(4) คือ ต้องทำครบ expect ทั้ง 4 function
     */
    expect.assertions(5);
    return swapi.getPeoplePromise(mockFetch).then(data => {
      // console.log("data", data);
      expect(mockFetch.mock.calls.length).toBe(1);
      expect(mockFetch).toBeCalledWith("https://swapi.co/api/people");
      expect(data.count).toEqual(87);
      // สร้างปลอมขึ้นมา
      expect(data.data).toEqual("romantic");
      expect(data.results.length).toBeGreaterThan(5);
    });
  });

  it("Async/Await return data romantic", async () => {
    try {
      const data = await swapi.getPeoplePromise(mockFetch);
      // console.log(data);
      expect.assertions(3);
      expect(data.data).toBe("romantic");
      expect(data.count).toEqual(87);
      expect(data.results.length).toBeGreaterThan(5);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });
});
