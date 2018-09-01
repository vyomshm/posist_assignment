const sha256 = require('js-sha256');

class Node{

	constructor(
		timestamp, 
		data, 
		nodeNumber, 
		nodeId, 
		referenceNodeId,
		childReferenceNodeId,
		genesisReferenceNodeId
	){
		this.timestamp = timestamp;
		this.data = data;
		this.nodeNumber = nodeNumber;
		this.nodeId = nodeId;
		this.referenceNodeId = referenceNodeId;
		this.childReferenceNodeId = childReferenceNodeId;
		this.genesisReferenceNodeId = genesisReferenceNodeId;
		this.HashValue = this.getHash();
	}

	getHash(){
		return sha256(
			JSON.stringify(this.timestamp + this.nodeNumber) + this.data + this.nodeId + this.referenceNodeId + this.childReferenceNodeId + this.genesisReferenceNodeId
		)
	}
}

module.exports = Node;