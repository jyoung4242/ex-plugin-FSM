import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode } from "excalibur";
import { ExFSM, ExState } from "./ExFSM";
import { model, template } from "./UI";
import { myIdleState, MyIdleState } from "./IdleState";
import { myActiveState, MyActiveState } from "./ActiveState";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
});
await game.start();

console.log("******************************************");
console.log("First State testing");
console.log("******************************************");

const myStates = new ExFSM();
myStates.register("idle", "walk", "jump", "run");
console.log(myStates);

myStates.set("idle");
setTimeout(() => {
  myStates.set("walk");
  console.log(myStates.get());
}, 1000);
setTimeout(() => {
  myStates.set("jump");
  console.log(myStates.get());
}, 2000);
setTimeout(() => {
  myStates.set("run");
  console.log(myStates.get());
}, 3000);
setTimeout(() => {
  myStates.set("idle");
  console.log(myStates.get());
  secondStates();
}, 4000);

function secondStates() {
  console.log("******************************************");
  console.log("Second State testing");
  console.log("******************************************");

  const myOtherStates = new ExFSM();

  myOtherStates.register(myIdleState, myActiveState);
  myOtherStates.set("idle");

  setTimeout(() => {
    myOtherStates.set("active");
  }, 3000);
}



