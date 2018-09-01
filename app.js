const Node = require('./src/node');
const NodeTree = require('./src/nodetree');

let tree = new NodeTree();

console.log("Initial Tree: ", tree.nodes, '\n');

tree.addChildNode(56, 0);
tree.addChildNode(100, 0);
tree.addChildNode(1000, 0);

console.log("New Tree with 3 nodes attached to genesis: ", tree.nodes, '\n');

tree.addChildNode(560, 1);

console.log("New Tree with a node added to node: 0x1: ", tree.nodes, '\n');

tree.editNodeValue(1, 57);

console.log("New Tree with a node 1 value edited: ", tree.nodes, '\n');