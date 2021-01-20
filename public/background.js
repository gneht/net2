/* CODE REVIEW */
chrome.runtime.onInstalled.addListener(() => {
  const menu = {
    net: "Go to your net",
    current: "Send current tab",
    sendall: "Send all tabs",
    sendallclose: "Send and close all tabs",
    collapseleft: "Collapse tabs to left",
    collapseright: "Collapse tabs to right",
  };

  for (let key of Object.keys(menu)) {
    chrome.contextMenus.create({
      id: key,
      title: menu[key],
      type: "normal",
      contexts: ["all"],
    });
  }
});

/* Multiple links */
const sendTabs = (tabs) => {
  const cards = JSON.parse(localStorage.getItem("cards")) || {};
  const columns = JSON.parse(localStorage.getItem("columns")) || {};
  const columnOrder = JSON.parse(localStorage.getItem("columnOrder")) || [];

  /* Create tasks */
  let additionalCards = {};
  let cardIds = [];
  let cardId;
  let t = 0;
  for (let tab = 0; tab < tabs.length; tab++) {
    while (true) {
      t++;
      cardId = "t" + t;
      if (!cards[cardId]) {
        break;
      }
    }
    additionalCards[cardId] = {
      id: cardId,
      text: tabs[tab].title,
      url: tabs[tab].url,
    };
    cardIds.unshift(cardId);
  }
  const newCards = { ...additionalCards, ...cards };

  /* Create column */
  const getNextColId = () => {
    let columnId;
    let i = 0;
    while (true) {
      columnId = "c" + i;
      if (!columns[columnId]) {
        return columnId;
      }
      i++;
    }
  };

  const newColumnId = getNextColId();
  const newColumn = {
    id: newColumnId,
    title: "",
    cardIds: cardIds,
  };
  const newColumns = {
    ...columns,
    [newColumnId]: newColumn,
  };

  /* Update columnOrder */
  const newColumnOrder = [newColumnId, ...columnOrder];

  /* Verification */

  /* Update localStorage */
  localStorage.setItem("cards", JSON.stringify(newCards));
  localStorage.setItem("columns", JSON.stringify(newColumns));
  localStorage.setItem("columnOrder", JSON.stringify(newColumnOrder));
};

/* Single link, activated by icon click */
const sendTab = (tab) => {
  const url = tab.url;
  const pageTitle = tab.title;

  let columns = JSON.parse(localStorage.getItem("columns"));
  const cards = JSON.parse(localStorage.getItem("cards"));
  const columnOrder = JSON.parse(localStorage.getItem("columnOrder"));

  if (
    !columns ||
    (Object.keys(columns).length === 0 && columns.constructor === Object)
  ) {
    const newCards = {
      t0: {
        id: "t0",
        text: pageTitle,
        url: url,
      },
    };
    const newColumns = {
      c0: {
        id: "c0",
        title: "",
        cardIds: [],
      },
    };
    localStorage.setItem("cards", JSON.stringify(newCards));
    localStorage.setItem("columns", JSON.stringify(newColumns));
  } else {
    /* Next available card id */
    let cardId;
    let i = 0;
    while (true) {
      cardId = "t" + i;
      if (!cards[cardId]) {
        break;
      }
      i++;
    }

    const newCard = {
      id: cardId,
      text: pageTitle,
      url: url,
    };
    const newCards = {
      [cardId]: newCard,
      ...cards,
    };
    localStorage.setItem("cards", JSON.stringify(newCards));

    if (columnOrder && columnOrder.length > 0) {
      const firstColumnId = columnOrder[0];
      columns[firstColumnId].cardIds.unshift(cardId);
      localStorage.setItem("columns", JSON.stringify(columns));
    }
  }

  /* Generate popup that confirms save */
  chrome.tabs.executeScript({
    file: "saveConfirmation.js",
  });

  /* Changing the icon */
};

/* CODE REVIEW */
chrome.contextMenus.onClicked.addListener(function (info, tabs) {
  switch (info.menuItemId) {
    case "net":
      chrome.runtime.openOptionsPage();
      break;
    case "current":
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let tab = tabs[0];
        sendTab(tab);
      });
      break;
    case "sendall":
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        sendTabs(tabs);
      });
      break;
    case "sendallclose":
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        sendTabs(tabs);
        chrome.runtime.openOptionsPage(() => {
          let tids = tabs.map((t) => t.id);
          chrome.tabs.remove(tids, () => {});
        });
      });
      break;
    case "collapseleft":
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let activeTabIndex = -1;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].active) {
            activeTabIndex = i;
            break;
          }
        }
        if (activeTabIndex !== -1) {
          const leftTabs = tabs.slice(0, activeTabIndex);
          sendTabs(leftTabs);
          let tids = leftTabs.map((t) => t.id);
          chrome.tabs.remove(tids, () => {});
        }
      });
      break;
    case "collapseright":
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let activeTabIndex = -1;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].active) {
            activeTabIndex = i;
            break;
          }
        }
        if (activeTabIndex !== -1) {
          const rightTabs = tabs.slice(activeTabIndex + 1, tabs.length);
          sendTabs(rightTabs);
          let tids = rightTabs.map((t) => t.id);
          chrome.tabs.remove(tids, () => {});
        }
      });
      break;
    default:
      break;
  }
});

/* We might want to replace with new tab page option? */

/* CODE REVIEW */
chrome.runtime.onStartup.addListener(function () {
  const options = JSON.parse(localStorage.getItem("options")) || {};
  if (!options || options.openOnLaunch) {
    chrome.runtime.openOptionsPage();
  }

  //   chrome.storage.sync.get(["options"], function (result) {
  //     let options = result.options;
  //     if (!options || options.openOnLaunch) {
  //     }
  //   });
});

/* On click of icon */

/* CODE REVIEW */
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let tab = tabs[0];
    sendTab(tab);
  });
});
