import { ExState } from "./ExFSM";

export class AsyncWait2 extends ExState {
  constructor() {
    super("wait2");
  }
  enter(_previous: ExState | null, ...params: any): void | Promise<void> {
    return new Promise(resolve => {
      console.log("entering wait2 ");
      setTimeout(() => {
        console.log("exiting wait2 entermethod");
        resolve();
      }, 2000);
    });
  }

  exit(_next: ExState | null, ...params: any): void | Promise<void> {
    return new Promise(resolve => {
      console.log("exiting wait2");
      setTimeout(() => {
        console.log("exiting wait2 exitmethod");
        resolve();
      }, 2000);
    });
  }

  update(...params: any): void | Promise<void> {
    console.log("updating idle");
  }
}

export const myAsyncWait2 = new AsyncWait2();
