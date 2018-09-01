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
			"0xGenesisNode" //genesis reference node id
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

	addChildNode(value,  parentNodeNumber){
		if(this.isValidChild(value, parentNodeNumber)){
			console.log('Adding node, child node valid...');
			// add node to nodes[]
			const childNode = this.createChildNode(value, parentNodeNumber);
			this.nodes.push(childNode);
			// update parent childReferenceNodeId[]
			this.nodes[parentNodeNumber].childReferenceNodeId.push(childNode.nodeId);
			//update totalVal;
			this.totalVal += value;
		}
	}

	// check if the node value is valid
	isValidChild(value, parentNodeNumber){
		if(value <= this.nodes[parentNodeNumber].data){
			return value <= this.totalVal;
		}else{
			console.log("Invalid Node: Rejected!!!!");
			return false;
		}
	}

	createChildNode(value, parentNodeNumber){
		return new Node(
			Math.floor(Date.now()/1000), // timestamp(now)
			value, // genesis node data
			this.nodes.length, // nodeNumber
			this.getNodeId(this.nodes.length), // nodeId
			this.nodes[parentNodeNumber].nodeId, // parent reference node ID
			[], // child id arrays[]
			"0xGenesisNode" //genesis reference node id
		);
	}

	//displays tree in bfs
	getTree(){
		// TO-DO
		return this.nodes;
	}

}

module.exports = NodeTree;