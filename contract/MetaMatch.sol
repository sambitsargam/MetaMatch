// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {IGmpReceiver} from "@analog-gmp/interfaces/IGmpReceiver.sol";
import {IGateway} from "@analog-gmp/interfaces/IGateway.sol";

contract LoveChain is ERC721URIStorage, IGmpReceiver {
    using Counters for Counters.Counter;

    address private immutable _gateway;
    address payable owner;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 public userCount = 0;
    uint256 listingPrice = 0.025 ether;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => User) private users;
    mapping(address => User) private userProfile;
    mapping(address => bool) public registeredUsers;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string name;
        string description;
        string image;
    }

    struct User {
        uint256 id;
        address payable _address;
        string name;
        string image;
        string profile;
        string gender;
        string year;
        string country;
        uint256 balance;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        string name,
        string description,
        string image
    );

    event UserCreated(
        uint256 id,
        address payable _address,
        string name,
        string image,
        string profile,
        string gender,
        string year,
        string country,
        uint256 balance
    );

    constructor(address gateway) ERC721("LoveChain Tokens", "LCHA") {
        _gateway = gateway;
        owner = payable(msg.sender);
    }

    /* Profile Management */
    function createProfile(
        string memory _name,
        string memory _image,
        string memory _profile,
        string memory _gender,
        string memory _year,
        string memory _country
    ) public {
        require(!registeredUsers[msg.sender], "User already registered");

        userCount++;
        User storage newUser = users[userCount];
        newUser.id = userCount;
        newUser._address = payable(msg.sender);
        newUser.name = _name;
        newUser.image = _image;
        newUser.profile = _profile;
        newUser.gender = _gender;
        newUser.year = _year;
        newUser.country = _country;
        newUser.balance = 0;

        userProfile[msg.sender] = newUser;
        registeredUsers[msg.sender] = true;

        emit UserCreated(
            newUser.id,
            newUser._address,
            newUser.name,
            newUser.image,
            newUser.profile,
            newUser.gender,
            newUser.year,
            newUser.country,
            newUser.balance
        );
    }

    function fetchAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userCount);
        for (uint256 i = 1; i <= userCount; i++) {
            allUsers[i - 1] = users[i];
        }
        return allUsers;
    }

    function getSingleUser() public view returns (User memory) {
        return userProfile[msg.sender];
    }

    /* NFT Marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price,
        string memory _name,
        string memory _description,
        string memory _image
    ) public payable returns (uint256) {
        require(msg.value == listingPrice, "Must pay listing price");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price, _name, _description, _image);

        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        string memory _name,
        string memory _description,
        string memory _image
    ) private {
        require(price > 0, "Price must be at least 1 wei");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            _name,
            _description,
            _image
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false,
            _name,
            _description,
            _image
        );
    }

    /* Cross-Chain Message Handling */
    function onGmpReceived(
        bytes32 source,
        uint128,
        bytes32,
        bytes calldata payload
    ) external payable override returns (bytes32) {
        require(msg.sender == _gateway, "Unauthorized gateway");

        // Decode and process the payload (example: increment user balance)
        (uint256 userId, uint256 amount) = abi.decode(payload, (uint256, uint256));
        require(userId > 0 && userId <= userCount, "Invalid user ID");

        User storage user = users[userId];
        user.balance += amount;

        return bytes32(user.balance);
    }

    function sendCrossChainMessage(
        bytes32 destinationChainId,
        uint256 userId,
        uint256 amount
    ) external {
        require(userId > 0 && userId <= userCount, "Invalid user ID");

        bytes memory payload = abi.encode(userId, amount);
        IGateway(_gateway).sendMessage(destinationChainId, address(this), payload);
    }

    /* Utility Functions */
    function updateListingPrice(uint256 _listingPrice) public {
        require(msg.sender == owner, "Only owner can update listing price");
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
}
