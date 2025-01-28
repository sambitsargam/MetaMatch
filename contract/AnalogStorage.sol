// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IGmpReceiver} from "@analog-gmp/interfaces/IGmpReceiver.sol";
import {IGateway} from "@analog-gmp/interfaces/IGateway.sol";

contract CrossChainStorage is IGmpReceiver {
    address private immutable _gateway;
    address public owner;

    uint256 public fileCount;
    mapping(uint256 => File) public files;
    mapping(address => uint256[]) public userFiles;

    struct File {
        uint256 id;
        string fileHash; // IPFS or similar hash
        string fileName;
        string fileType;
        uint256 fileSize;
        string fileDescription;
        uint256 uploadTime;
        address uploader;
    }

    event FileUploaded(
        uint256 id,
        string fileHash,
        string fileName,
        string fileType,
        uint256 fileSize,
        string fileDescription,
        uint256 uploadTime,
        address indexed uploader
    );

    event CrossChainFileSync(
        bytes32 indexed sourceChain,
        uint256 indexed fileId,
        address indexed uploader
    );

    constructor(address gateway) {
        _gateway = gateway;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /**
     * @notice Upload a file to the storage system
     * @param fileHash The hash of the file (e.g., IPFS CID)
     * @param fileName The name of the file
     * @param fileType The type of the file (e.g., "image/png")
     * @param fileSize The size of the file in bytes
     * @param fileDescription A brief description of the file
     */
    function uploadFile(
        string memory fileHash,
        string memory fileName,
        string memory fileType,
        uint256 fileSize,
        string memory fileDescription
    ) public {
        require(bytes(fileHash).length > 0, "File hash required");
        require(bytes(fileName).length > 0, "File name required");
        require(fileSize > 0, "File size must be greater than 0");

        fileCount++;
        files[fileCount] = File({
            id: fileCount,
            fileHash: fileHash,
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            fileDescription: fileDescription,
            uploadTime: block.timestamp,
            uploader: msg.sender
        });

        userFiles[msg.sender].push(fileCount);

        emit FileUploaded(
            fileCount,
            fileHash,
            fileName,
            fileType,
            fileSize,
            fileDescription,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Retrieve all files uploaded by a user
     * @param user The address of the user
     * @return Array of File structs
     */
    function getUserFiles(address user) public view returns (File[] memory) {
        uint256[] memory userFileIds = userFiles[user];
        File[] memory userFileList = new File[](userFileIds.length);

        for (uint256 i = 0; i < userFileIds.length; i++) {
            userFileList[i] = files[userFileIds[i]];
        }

        return userFileList;
    }

    /**
     * @notice Handle cross-chain synchronization of files
     * @param source The source chain ID
     * @param payload Encoded file data
     * @return Resulting hash of the file ID
     */
    function onGmpReceived(
        bytes32 source,
        uint128,
        bytes32,
        bytes calldata payload
    ) external payable override returns (bytes32) {
        require(msg.sender == _gateway, "Unauthorized gateway");

        // Decode payload to extract file data
        (uint256 id, string memory fileHash, string memory fileName, string memory fileType, uint256 fileSize, string memory fileDescription, address uploader) =
            abi.decode(payload, (uint256, string, string, string, uint256, string, address));

        // Store file on this chain
        files[id] = File({
            id: id,
            fileHash: fileHash,
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            fileDescription: fileDescription,
            uploadTime: block.timestamp,
            uploader: uploader
        });

        userFiles[uploader].push(id);

        emit CrossChainFileSync(source, id, uploader);

        return bytes32(id);
    }

    /**
     * @notice Send file data to another chain
     * @param destinationChainId The ID of the destination chain
     * @param fileId The ID of the file to sync
     */
    function syncFileToChain(bytes32 destinationChainId, uint256 fileId) public {
        File memory file = files[fileId];
        require(file.uploader == msg.sender, "Not the file uploader");

        // Encode file data into payload
        bytes memory payload = abi.encode(
            file.id,
            file.fileHash,
            file.fileName,
            file.fileType,
            file.fileSize,
            file.fileDescription,
            file.uploader
        );

        IGateway(_gateway).sendMessage(destinationChainId, address(this), payload);
    }
}
