// background.ts
import { IndexedHelper } from "./IndexedHelper";
import {Word} from "./word";

const dbHelper = new IndexedHelper<Word>("VocabularyDB", "WordsStore");

chrome.runtime.onInstalled.addListener(async () => {
  await dbHelper.init();
  console.log("Database initialized.");
});



async function handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): Promise<void> {
  const { action, payload } = message;
  console.log("Received message:", message);
  try {
    switch (action) {
      case "addWord":
        await dbHelper.addItem(payload);
        sendResponse({ status: "success" });
        break;

      case "getWords":
        const words = await dbHelper.getAllItems();
        console.log("查询出来的 words:", words);
        sendResponse({ status: "success", data: words });
        break;

      case "updateWord":
        await dbHelper.updateItem(payload);
        sendResponse({ status: "success" });
        break;

      case "deleteWord":
        await dbHelper.deleteItem(payload.id);
        sendResponse({ status: "success" });
        break;

      default:
        sendResponse({ status: "error", message: "Invalid action" });
        break;
    }
  } catch (error) {
    const err = error as Error;
    sendResponse({ status: "error", message: err.message });
  }
}

// 监听消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);

  return true; // 保持异步
});
