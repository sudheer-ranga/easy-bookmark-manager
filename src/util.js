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

let activeFolder = null;

const searchObjectRecursively = (childJson, id) => {
  let isFound = Object.keys(childJson).some(k => {
    if (childJson[k].id === id) {
      activeFolder = childJson[k];
      return true;
    } else {
      if (childJson[k].children) {
        return searchObjectRecursively(childJson[k].children, id);
      }
    }

    return false;
  });

  return isFound;
};

export const findBookmarksById = (bookmarksJson, id) => {
  const json = bookmarksJson[0].children;

  Object.keys(json).some(key => {
    if (json[key].id === id) {
      activeFolder = json[key];
      return true;
    }

    const childJson = json[key].children;

    if (childJson) {
      return searchObjectRecursively(childJson, id);
    }

    return false;
  });

  console.log('Active Folder: ', activeFolder);

  return activeFolder;
};
