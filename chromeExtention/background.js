chrome.webNavigation.onBeforeNavigate.addListener(details => {
  // This code will run every time the user tries to navigate to a new website
  console.warn("Before navigating to URL: " + details.url);

  // You can implement your custom logic here to change the destination URL
  // For example, you can decide to redirect the user to a different URL
  if (details.url.startsWith("https://google.com/")) {
    const newURL = "https://xyz.com/"; // Define the new destination URL
    chrome.webNavigation.onBeforeNavigate.removeListener(onBeforeNavigate); // Remove the listener to prevent an infinite loop
    chrome.webNavigation.onBeforeNavigate.removeListener(onBeforeNavigate);
    chrome.tabs.update(details.tabId, { url: newURL });
  }
});
