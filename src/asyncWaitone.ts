import { ExState } from "./ExFSM";

class AsyncWait1 extends ExState {
  constructor() {
    super("wait1");
  }
  enter(_previous: ExState | null, ...params: any): void | Promise<void> {
    return new Promise(resolve => {
      console.log("entering wait1");
      setTimeout(() => {
        console.log("exiting wait1 entermethod");
        resolve();
      }, 2000);
    });
  }

  exit(_next: ExState | null, ...params: any): void | Promise<void> {
    return new Promise(resolve => {
      console.log("exiting wait1");
      setTimeout(() => {
        console.log("exiting wait1 exitmethod");
        resolve();
      }, 2000);
    });
  }

  update(...params: any): void | Promise<void> {
    console.log("updating idle");
  }
}

export const myAsyncWait1 = new AsyncWait1();
