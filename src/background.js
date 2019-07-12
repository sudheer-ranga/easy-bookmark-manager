(function() {
  const getChildrenNodes = childrenNodes => {
    let result = {};

    childrenNodes.children.forEach(node => {
      result[node.id] = {
        title: node.title || null,
        parentId: node.parentId || null
      };

      if (node.children && node.children.length > 0) {
        result[node.id].children = getChildrenNodes(node);
      } else if (node.url) {
        result[node.id].url = node.url;
      }
    });

    return result;
  };

  const generateBookmarksJson = nodes => {
    let result = {};

    nodes.forEach(node => {
      result[node.id] = {
        title: node.title || null,
        parentId: node.parentId || null,
        children: getChildrenNodes(node)
      };
    });

    return result;
  };

  chrome.runtime.onInstalled.addListener(() => {
    chrome.bookmarks.getTree(bookmarkTreeNodes => {
      const bookmarks = generateBookmarksJson(bookmarkTreeNodes);
      console.log('Bookmarks: ', bookmarks);
      console.log('Bookmarks BookmarkTreeNodes: ', bookmarkTreeNodes);
    });
  });
})();
