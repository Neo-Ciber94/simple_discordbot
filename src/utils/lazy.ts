type LazyUnInit<T> = {
  state: "uninit";
  factory: () => T;
};

type LazyInit<T> = {
  state: "init";
  value: T;
};

type LazyState<T> = LazyUnInit<T> | LazyInit<T>;

export class Lazy<T> {
  #value: LazyState<T>;

  constructor(factory: () => T) {
    this.#value = {
      state: "uninit",
      factory,
    };
  }

  value(): T {
    const value = this.#value;
    let obj: T;

    switch (value.state) {
      case "uninit":
        {
          obj = value.factory();
          this.#value = {
            state: "init",
            value: obj,
          };
        }
        break;
      case "init":
        obj = value.value;
        break;
    }

    return obj;
  }
}
