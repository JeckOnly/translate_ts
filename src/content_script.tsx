import { Panel } from './panel';
import {isCheckedKey} from "./constant";

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }
// });








let panel: Panel = new Panel();
console.log("执行到这");

window.onmouseup = function (e: MouseEvent): void {
  const saved = localStorage.getItem(isCheckedKey);
  let turnedOn: Boolean =  saved ? JSON.parse(saved) : false;
  // log saved and turnedOn
    console.log(saved);
    console.log(turnedOn);

  if (!turnedOn) {
    return;
  }
  let selection = window.getSelection();
  if (!selection ) {
    return;
  }
  let raw: string = selection.toString().trim();
  let x: number = e.pageX;
  let y: number = e.pageY;

  if (!raw) {
    return;
  } else {
    panel.pos({ x: x, y: y });
    panel.translate(raw);
    panel.show();
  }
}