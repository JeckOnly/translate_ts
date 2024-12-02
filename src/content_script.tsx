import {Panel} from './panel';
import {isCheckedKey} from "./constant";
import {Word} from './word';

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
    chrome.storage.local.get([isCheckedKey], (result) => {
        if (result[isCheckedKey] !== undefined) {
            const saved: Boolean = result[isCheckedKey];
            console.log("isChecked is " + result[isCheckedKey] + " saved is " + saved);

            if (!saved) {
                return;
            }
            let selection = window.getSelection();
            console.log("selection is " + selection);
            if (!selection) {
                return;
            }
            if (selection.toString().trim() === "" && !panel.contains(e)) {
                panel.hide()
                console.log("发送消息 查询单词");
                chrome.runtime.sendMessage({ action: "getWords" }, (response) => {
                    console.log("查询单词 Received response:", response);
                    if (response.status === "success") {
                        console.log("Retrieved words:", response.data);
                    } else {
                        console.error("Error:", response.message);
                    }
                });

                return;
            }
            let raw: string = selection.toString().trim();
            let x: number = e.pageX;
            let y: number = e.pageY;

            if (!raw) {
                return;
            } else {
                panel.pos({x: x, y: y});
                panel.translate(raw);
                panel.show();

                console.log("发送消息 添加单词");
                chrome.runtime.sendMessage(
                    { action: "addWord", payload: Word.create("example") },
                    (response) => {
                        console.log("插入单词 Received response:", response);
                        if (response.status === "success") {
                            console.log("Word added successfully!");
                        } else {
                            console.error("Error:", response.message);
                        }
                    }
                );

            }
        }
    });
}