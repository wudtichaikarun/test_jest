import fetch from "node-fetch";
import swapi from "./lib/async";
import axios from "axios";
import Users from "./lib/users";

jest.mock("axios");

describe("Mock function module", () => {
  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }

  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // console.dir(mockCallback);
  /**
     { [Function: mockConstructor]
      _isMockFunction: true,
      getMockImplementation: [Function],
      mock: [Getter/Setter],
      mockClear: [Function],
      mockReset: [Function],
      mockRestore: [Function],
      mockReturnValueOnce: [Function],
      mockResolvedValueOnce: [Function],
      mockRejectedValueOnce: [Function],
      mockReturnValue: [Function],
      mockResolvedValue: [Function],
      mockRejectedValue: [Function],
      mockImplementationOnce: [Function],
      mockImplementation: [Function],
      mockReturnThis: [Function],
      mockName: [Function],
      getMockName: [Function] }
   */
  // console.dir(mockCallback.mock);
  /**
  { calls: [ [ 0 ], [ 1 ] ],
      instances: [ undefined, undefined ],
      invocationCallOrder: [ 1, 2 ],
      results:
       [ { type: 'return', value: 42 }, { type: 'return', value: 43 } ] }
   */

  test("The mock function is called twice", () => {
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  test("The first argument of the first call to the function was 0", () => {
    expect(mockCallback.mock.calls[0][0]).toBe(0);
  });

  test(" The first argument of the second call to the function was 1", () => {
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  test("The return value of the first call to the function was 42", () => {
    expect.assertions(2);
    expect(mockCallback.mock.results[0].value).toBe(42);
    expect(mockCallback.mock.results[1].value).toBe(43);
  });
});

describe("Mock axios module", () => {
  test("should fetch users", () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    axios.get.mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    return Users.all().then(data => expect(data).toEqual(users));
  });
});
