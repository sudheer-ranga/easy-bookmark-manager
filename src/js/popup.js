document.addEventListener('DOMContentLoaded', function() {
  const backgroundPage = chrome.extension.getBackgroundPage();

  const bookmarks = backgroundPage.bookmarks;
  console.log('Bookmarks: ', bookmarks);
});
