chrome.runtime.sendMessage({ type: "getTerms" }, (wordList) => {
    const bodyText = document.body.innerHTML;
    wordList.forEach((pair) => {
      const regex = new RegExp(pair.oldTerm, "g");
      document.body.innerHTML = document.body.innerHTML.replace(regex, pair.newTerm);
    });
  });
  