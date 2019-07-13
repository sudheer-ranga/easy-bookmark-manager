(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const backgroundPage = chrome.extension.getBackgroundPage();
    const bookmarks = backgroundPage.bookmarks;

    window.postMessage(bookmarks);
  });
})();
