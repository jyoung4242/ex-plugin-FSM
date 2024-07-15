import { ExFSM, ExState } from "../src/ExFSM";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ExFSM", () => {
  let fsm: ExFSM;

  beforeEach(() => {
    fsm = new ExFSM();
  });

  it("should register states", () => {
    const states = fsm.register("idle", "active");
    expect(states.length).toBe(2);
    expect(fsm.states.size).toBe(2);
  });

  it("should set the current state", () => {
    const states = fsm.register("idle", "active");
    fsm.set(states[0]);
    expect(fsm.get()).toBe(states[0]);
  });

  it("should throw an error if no state is set", () => {
    expect(() => fsm.get()).toThrowError("No state set");
  });

  it("should reset the current state", () => {
    const states = fsm.register("idle", "active");
    fsm.set(states[0]);
    expect(fsm.get()).toBe(states[0]);
    fsm.reset();
    expect(() => fsm.get()).toThrowError("No state set");
  });

  it("should update the current state", () => {
    class TestState extends ExState {
      counter: number = 0;
      constructor() {
        super("test");
      }
      getCounter() {
        return this.counter;
      }
      update(...params: any): void | Promise<void> {
        this.counter++;
      }
    }
    const mytestState = new TestState();

    const states = fsm.register(mytestState);
    fsm.set("test");
    expect(fsm.current).toBe(states[0]);
    fsm.update();
    expect(mytestState.getCounter()).toBe(1);
  });

  it("should throw error if setting to invalid state", () => {
    const states = fsm.register("idle", "active");
    expect(() => fsm.set("invalid")).toThrowError("State invalid not found");
  });

  it("should call leaving of one state and entering of another", () => {
    class TestState1 extends ExState {
      counter: number = 0;
      constructor() {
        super("test");
      }
      getCounter() {
        return this.counter;
      }
      exit(_next: ExState | null, ...params: any): void | Promise<void> {
        this.counter++;
      }
    }

    class TestState2 extends ExState {
      counter: number = 0;
      constructor() {
        super("test2");
      }
      getCounter() {
        return this.counter;
      }
      enter(_previous: ExState | null, ...params: any): void | Promise<void> {
        this.counter++;
      }
    }

    const mytestState1 = new TestState1();
    const mytestState2 = new TestState2();

    const states = fsm.register(mytestState1, mytestState2);
    fsm.set(states[0]);
    expect(fsm.get()).toStrictEqual(states[0]);
    expect(mytestState1.getCounter()).toBe(0);
    expect(mytestState2.getCounter()).toBe(0);
    fsm.set(states[1]);
    expect(fsm.get()).toStrictEqual(states[1]);
    expect(mytestState1.getCounter()).toBe(1);
    expect(mytestState2.getCounter()).toBe(1);
  });

  it("should asynchronously call leaving of one state and entering of another", async () => {
    class TestState1 extends ExState {
      counter: number = 0;
      constructor() {
        super("test");
      }
      getCounter() {
        return this.counter;
      }
      exit(_next: ExState | null, ...params: any): void | Promise<void> {
        return new Promise(resolve => {
          this.counter++;
          resolve();
        });
      }
    }

    class TestState2 extends ExState {
      counter: number = 0;
      constructor() {
        super("test2");
      }
      getCounter() {
        return this.counter;
      }
      enter(_previous: ExState | null, ...params: any): void | Promise<void> {
        return new Promise(resolve => {
          this.counter++;
          resolve();
        });
      }
    }

    const mytestState1 = new TestState1();
    const mytestState2 = new TestState2();

    const states = fsm.register(mytestState1, mytestState2);
    fsm.set(states[0]);
    expect(fsm.get()).toStrictEqual(states[0]);
    expect(mytestState1.getCounter()).toBe(0);
    expect(mytestState2.getCounter()).toBe(0);
    await fsm.set(states[1]);

    expect(fsm.get()).toStrictEqual(states[1]);
    expect(mytestState1.getCounter()).toBe(1);
    expect(mytestState2.getCounter()).toBe(1);
  });

  it("should synchronously leave the current state and asynchronously enter the next state", async () => {
    class TestState1 extends ExState {
      constructor() {
        super("test");
      }
    }

    class TestState2 extends ExState {
      counter: number = 0;
      constructor() {
        super("test2");
      }
      getCounter() {
        return this.counter;
      }
      enter(_previous: ExState | null, ...params: any): void | Promise<void> {
        return new Promise(resolve => {
          this.counter++;
          resolve();
        });
      }
    }

    const mytestState1 = new TestState1();
    const mytestState2 = new TestState2();

    const states = fsm.register(mytestState1, mytestState2);
    fsm.set(states[0]);
    expect(fsm.get()).toStrictEqual(states[0]);
    expect(mytestState2.getCounter()).toBe(0);
    await fsm.set(states[1]);

    expect(fsm.get()).toStrictEqual(states[1]);

    expect(mytestState2.getCounter()).toBe(1);
  });

  it("should asynchronously leave the current state andsynchronously enter the next state", async () => {
    class TestState1 extends ExState {
      counter: number = 0;
      constructor() {
        super("test");
      }
      getCounter() {
        return this.counter;
      }
      exit(_next: ExState | null, ...params: any): void | Promise<void> {
        return new Promise(resolve => {
          this.counter++;
          resolve();
        });
      }
    }

    class TestState2 extends ExState {
      counter: number = 0;
      constructor() {
        super("test2");
      }
      getCounter() {
        return this.counter;
      }
      enter(_previous: ExState | null, ...params: any): void | Promise<void> {
        this.counter++;
      }
    }

    const mytestState1 = new TestState1();
    const mytestState2 = new TestState2();

    const states = fsm.register(mytestState1, mytestState2);
    fsm.set(states[0]);
    expect(fsm.get()).toStrictEqual(states[0]);
    expect(mytestState1.getCounter()).toBe(0);
    expect(mytestState2.getCounter()).toBe(0);
    await fsm.set(states[1]);
    expect(fsm.get()).toStrictEqual(states[1]);
    expect(mytestState1.getCounter()).toBe(1);
    expect(mytestState2.getCounter()).toBe(1);
  });
});
