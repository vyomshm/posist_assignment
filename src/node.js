const sha256 = require('js-sha256');

class Node{

	constructor(
		timestamp, 
		data, 
		nodeNumber, 
		nodeId, 
		referenceNodeId,
		childReferenceNodeId,
		genesisReferenceNodeId,
		owner
	){
		this.timestamp = timestamp;
		this.data = data; // implement encryption func here
		this.nodeNumber = nodeNumber;
		this.nodeId = nodeId;
		this.referenceNodeId = referenceNodeId;
		this.childReferenceNodeId = childReferenceNodeId;
		this.genesisReferenceNodeId = genesisReferenceNodeId;
		this.HashValue = this.getHash();
		this.owner = owner;
		this.value = data;
	}

	getHash(){
		return sha256(
			JSON.stringify(this.timestamp + this.nodeNumber) + this.data + this.nodeId + this.referenceNodeId + this.childReferenceNodeId + this.genesisReferenceNodeId
		)
	}

	verifyOwner(ownerName, password,  encryptionKey){
		if(encryptionKey == sha256(ownerName+password)){
			return true;
		}
	}
}

module.exports = Node;