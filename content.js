
chrome.tabs.onCreated.addListener(tab => {
  console.log(tab);
  console.log("heyo");
  alert("fuck");
});
