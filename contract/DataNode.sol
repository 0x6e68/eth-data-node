pragma solidity ^0.5.2;

contract DataNode {
    constructor() public {}

    uint private index;

    event DataAdded(
        string metaData,
        uint dataByteLength,
        uint index
    );

    function postDataTransaction(bytes calldata data, string calldata metaData) external payable {
emit DataAdded(metaData, data.length, index);
index++;
}

function getIndex() public view returns (uint){
return index;
}

}
