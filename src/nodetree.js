const Node = require('./node');

class NodeTree{
	constructor(){
		this.GenesisNode = new Node(
			Math.floor(Date.now()/1000), // genesis timestamp(1st Sep 2018)
			1e10, // genesis node data
			0, // nodeNumber
			this.getNodeId(0), //genesis reference node id
			null, // empty reference node ID
			[], // child id arrays[]
			"0xGenesisNode", //genesis reference node id
			"Vyom"
		);

		this.nodes = [ this.GenesisNode ];

		// this keeps track of total value of all nodes upto now
		this.totalVal = 1e10;
	}

	getNodeId(_nodeNumber){
		if(_nodeNumber == 0){
			return "0xGenesisNode"
		}else{
			return `0x${_nodeNumber}`;
		}
	}

	addChildNode(value,  parentNodeNumber, owner){
		if(this.isValidChild(value, parentNodeNumber)){
			console.log('Adding node, child node valid...');
			// add node to nodes[]
			const childNode = this.createChildNode(value, parentNodeNumber, owner);
			this.nodes.push(childNode);
			// update parent childReferenceNodeId[]
			this.nodes[parentNodeNumber].childReferenceNodeId.push(childNode.nodeId);
			//update totalVal;
			this.totalVal += value;
		}
	}

	createChildNode(value, parentNodeNumber, owner){
		return new Node(
			Math.floor(Date.now()/1000), // timestamp(now)
			value, // genesis node data
			this.nodes.length, // nodeNumber
			this.getNodeId(this.nodes.length), // nodeId
			this.nodes[parentNodeNumber].nodeId, // parent reference node ID
			[], // child id arrays[]
			"0xGenesisNode", //genesis reference node id
			owner
		);
	}

	editNodeValue(nodeNumber, newValue){
		// if(isValidChild(newValue, this.nodes[nodeNumber].referenceNodeId)){
			
		// }
		//TO-DO check if the new value is vald before editing
		this.nodes[nodeNumber].value = newValue;

		//update data
		this.nodes[nodeNumber].data = newValue;
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

	//displays tree in bfs pattern
	getTree(){
		// TO-DO
		return this.nodes;
	}

}

module.exports = NodeTree;