const Node = require('./node');

class NodeTree{
	constructor(){
		this.GenesisNode = new Node(
			this.getTimestamp(), // genesis timestamp(1st Sep 2018)
			1e10, // genesis node data
			0, // nodeNumber
			this.getNodeId(0), //genesis reference node id
			null, // empty reference node ID
			[], // child id arrays[]
			"Node:#GenesisNode", //genesis reference node id
			"Satoshi Nakamoto" // genesis creator
		);

		this.nodes = [ this.GenesisNode ];

		// this keeps track of total value of all nodes upto now
		this.totalVal = 1e10;
	}

	addChildNode(value,  parentNodeNumber, owner){
		if(this.isValidChild(value, parentNodeNumber)){
			console.log('Adding node, child node valid ...');
			// add node to nodes[]
			const childNode = this.createChildNode(value, parentNodeNumber, owner);
			this.nodes.push(childNode);
			// update parent childReferenceNodeId[]
			this.nodes[parentNodeNumber].childReferenceNodeId.push(childNode.nodeId);
			//update totalVal;
			this.totalVal += value;
			console.log('Node added to Tree.\n');
		}
	}

	createChildNode(value, parentNodeNumber, owner){
		return new Node(
			Math.floor(Date.now()/1000), // timestamp(now)
			value, // genesis node data
			this.nodes.length, // nodeNumber
			this.getNodeId(this.nodes.length), // nodeId
			this.nodes[parentNodeNumber].nodeId, // parent reference node ID
			[], // child id array[]
			"Node:#GenesisNode", //genesis reference node id
			owner
		);
	}

	editNodeValue(nodeNumber, newValue){
		let parentNodeNumber = this.getNodefromID(this.nodes[nodeNumber].referenceNodeId);
		if(newValue < this.nodes[parentNodeNumber].value){
			//check if the new value is vald before editing
			this.nodes[nodeNumber].value = newValue;

			//update data
			this.nodes[nodeNumber].data = newValue;
		}else{
			console.log("New node value invalid...Edit cancellled.\n")
		}
	}

	changeOwner(nodeNumber, newOwner){
		this.nodes[nodeNumber].owner = newOwner;
	}

	// check if the node value is valid
	isValidChild(value, parentNodeNumber){
		if(value <= this.nodes[parentNodeNumber].value){
			return value <= this.totalVal;
		}else{
			console.log("Invalid Node: Rejected!!!!");
			return false;
		}
	}

	//Helper functions

	//displays tree in bfs pattern
	getTree(){
		// TO-DO - implement bfs
		let sequence = 'Root::Node:#GenesisNode';
		this.nodes.forEach((node)=>{
			sequence = sequence + ' -> ' + node.nodeId;
		});
		return sequence;
	}

	getTimestamp(){
		return Math.floor(Date.now()/1000);
	}

	getNodefromID(nodeId){
		if(nodeId == 'Node:#GenesisNode'){
			return 0;
		}
		return parseInt(nodeId.slice(6,nodeId.length), 10);
	}

	getNodeId(_nodeNumber){
		if(_nodeNumber == 0){
			return "Node:#GenesisNode"
		}else{
			return `Node:#${_nodeNumber}`;
		}
	}

}

module.exports = NodeTree;