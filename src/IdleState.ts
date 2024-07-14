import { ExState } from "./ExFSM";

export class MyIdleState extends ExState {
  constructor() {
    super("idle");
  }
  enter(_previous: ExState | null, ...params: any): void | Promise<void> {
    console.log("entering idle");
  }

  exit(_next: ExState | null, ...params: any): void | Promise<void> {
    console.log("exiting idle");
  }

  update(...params: any): void | Promise<void> {
    console.log("updating idle");
  }
}

export const myIdleState = new MyIdleState();
