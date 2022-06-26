import { getArray } from "../../src/utils/getArray";

describe("getArray", () => {
  test("from value", () => {
    const array = getArray(1);
    expect(array).toStrictEqual([1]);
  });

  test("from array", () => {
    const array = getArray([1, 2, 3]);
    expect(array).toStrictEqual([1, 2, 3]);
  });
});
