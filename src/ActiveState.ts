import { ExState } from "./ExFSM";

export class MyActiveState extends ExState {
  constructor() {
    super("active");
  }

  enter() {
    console.log("entering active");
  }
  update() {
    console.log("updating active");
  }
  exit() {
    console.log("exiting active");
  }
}

export const myActiveState = new MyActiveState();
