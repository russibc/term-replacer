chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ wordList: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTerms") {
    chrome.storage.local.get("wordList", (data) => {
      sendResponse(data.wordList);
    });
    return true; // Keep the message channel open for sendResponse
  } else if (message.type === "setTerms") {
    chrome.storage.local.set({ wordList: message.wordList });
    sendResponse({ status: "success" });
  }
});
