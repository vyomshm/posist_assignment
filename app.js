const Node = require('./src/node');
const NodeTree = require('./src/nodetree');

let tree = new NodeTree();

console.log("Initial Tree: ", tree.getTree(), '\n');

tree.addChildNode(56, 0, "owner1");
tree.addChildNode(100, 0, "owner2");
tree.addChildNode(1000, 0, "owner3");

console.log("New Tree with 3 nodes attached to genesis: ", tree.getTree(), '\n');

tree.addChildNode(560, 3, "Vyom Sharma");

console.log("New Tree with a node added to node: 0x1: ", tree.getTree(), '\n');

console.log("trying to add an invalid node: ...");
tree.addChildNode(5600, 3, "Vyom Sharma");

console.log("\nediting node:#1: ...");
tree.editNodeValue(1, 57);

console.log("\changing ownership of node:#4: ...");
tree.changeOwner(3, "NewOwnerXYZ");

console.log("Final Tree with a node 1 value edited: ", tree.getTree(), '\n');