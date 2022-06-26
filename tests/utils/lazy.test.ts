import { Lazy } from "../../src/utils/lazy";

describe("Lazy", () => {
  test("lazy value", () => {
    const lazy = new Lazy(() => 42);
    expect(lazy.isInitialized).toBeFalsy();
    expect(lazy.value).toBe(42);
    expect(lazy.isInitialized).toBeTruthy();
  });
});
