document.addEventListener("DOMContentLoaded", () => {
  const inputOldTerm = document.getElementById("inputOldTerm");
  const inputNewTerm = document.getElementById("inputNewTerm");
  const addTermButton = document.getElementById("addTermButton");
  const wordListDiv = document.getElementById("wordList");

  function updateTermListDisplay(wordList) {
    wordListDiv.innerHTML = "";
    wordList.forEach((pair, index) => {
      const div = document.createElement("div");
      div.className = "word-pair";
      div.textContent = `${pair.oldTerm} -> ${pair.newTerm}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        wordList.splice(index, 1);
        chrome.runtime.sendMessage({ type: "setTerms", wordList }, (response) => {
          if (response.status === "success") {
            loadTermList();
          }
        });
      });

      div.appendChild(removeButton);
      wordListDiv.appendChild(div);
    });
  }

  function loadTermList() {
    chrome.runtime.sendMessage({ type: "getTerms" }, (response) => {
      updateTermListDisplay(response);
    });
  }

  addTermButton.addEventListener("click", () => {
    const oldTerm = inputOldTerm.value.trim();
    const newTerm = inputNewTerm.value.trim();
    if (oldTerm && newTerm) {
      chrome.runtime.sendMessage({ type: "getTerms" }, (response) => {
        const wordList = response;
        wordList.push({ oldTerm, newTerm });
        chrome.runtime.sendMessage({ type: "setTerms", wordList }, (response) => {
          if (response.status === "success") {
            loadTermList();
            inputOldTerm.value = "";
            inputNewTerm.value = "";
          }
        });
      });
    }
  });

  loadTermList();
});
