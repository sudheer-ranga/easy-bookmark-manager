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

export const initialActiveBookmark = json => {
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

const isStringPresent = (title, strings) => {
  return strings.some(string => {
    return title.toLowerCase().indexOf(string) > -1;
  });
};

export const searchJson = (json, searchString, searchResults) => {
  if (!searchString) {
    return json;
  }

  searchString = searchString.toLowerCase();

  Object.keys(json).forEach(key => {
    let title = json[key].title;
    let strings = searchString.split(' ');

    if (title && isStringPresent(title, strings)) {
      if (!json[key].children) {
        searchResults.push(json[key]);
      } else {
        searchJson(json[key].children, searchString, searchResults);
      }
    }

    if (json[key].children) {
      searchJson(json[key].children, searchString, searchResults);
    }
  });

  return searchResults;
};

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const getJsonAsArray = (json, results) => {
  Object.keys(json).forEach(key => {
    if (!json[key].children) {
      results.push(json[key]);
    } else {
      getJsonAsArray(json[key].children, results);
    }
  });

  return results;
};
