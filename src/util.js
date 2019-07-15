const getChildrenNodes = childrenNodes => {
  let result = {};

  childrenNodes.children.forEach(node => {
    result[node.id] = {
      id: node.id,
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

export const generateBookmarksJson = nodes => {
  let result = {};

  nodes.forEach(node => {
    result[node.id] = {
      id: node.id,
      title: node.title || null,
      parentId: node.parentId || null,
      children: getChildrenNodes(node)
    };
  });

  return result;
};

export const initialActiveBookmark = bookmarksJson => {
  const json = bookmarksJson[0].children;
  let firstBookmark = null;

  Object.keys(json).some(key => {
    const childJson = json[key].children;

    let hasChildren = Object.keys(childJson).some(k => {
      if (childJson[k].children) {
        firstBookmark = childJson[k];
        return true;
      }

      return false;
    });

    return hasChildren;
  });

  return firstBookmark;
};

let searchResults = [];

export const searchJson = (json, searchString) => {
  if (!searchString) {
    return json;
  }

  searchString = searchString.toLowerCase();

  Object.keys(json).forEach(key => {
    let title = json[key].title;

    if (title && title.toLowerCase().indexOf(searchString) > -1) {
      if (!json[key].children) {
        searchResults.push(json[key]);
      } else {
        searchJson(json[key].children, searchString);
      }
    }

    if (json[key].children) {
      searchJson(json[key].children, searchString);
    }
  });

  return searchResults;
};
