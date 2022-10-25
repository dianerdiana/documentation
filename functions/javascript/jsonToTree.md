# Mengubah object ke bentuk tree

## Live Demo bisa dilihat [disini](https://codesandbox.io/s/convert-json-to-tree-604nth?file=/src/index.js)

```javascript
const jsonToTree = (items) => {
  const tree = [];
  const mappedArray = {};

  // loop over item
  items.forEach((item) => {
    const id = item.id;
    if (!mappedArray.hasOwnProperty(id)) {
      // in case of duplicates
      mappedArray[id] = item;
      mappedArray[id].children = [];
    }
  });

  let mappedElem;
  // loop in hashed table
  for (let id in mappedArray) {
    if (mappedArray.hasOwnProperty(id)) {
      mappedElem = mappedArray[id];
      if (mappedElem.Parent) {
        const parentId = mappedElem.Parent;
        mappedArray[parentId].children.push(mappedElem);
      } else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
}
```