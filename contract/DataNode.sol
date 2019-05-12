pragma solidity ^0.5.2;

interface DataNodeInterface {

  event DataAdded(
    string metaData,
    uint dataByteLength,
    uint usedIndex,
    uint indexed index,
    address indexed from
  );

  function postDataTransaction(bytes calldata data, string calldata metaData) external;
  function getNextIndex() external view returns (uint);

}

contract DataNode is DataNodeInterface {
  constructor() public {}

  uint private index = 1;

  function postDataTransaction(bytes calldata data, string calldata metaData) external {
    emit DataAdded(metaData, data.length, index, index, msg.sender);
    index++;
  }

  function getNextIndex() external view returns (uint){
    return index;
  }

}


