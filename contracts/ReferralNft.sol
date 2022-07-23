// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract ReferralNft is ERC721URIStorage{
    uint public employmentReferenceCounter;
    //  array of objs
    mapping(uint => EmploymentReference) public employmentReferenceList;

    struct EmploymentReference {
        uint id;
        string employeeName;
        string companyName;
        string nftImageLlink;
        string website;
        string recommendation;
        address employeeWalletAddress;
    }

    event NewEmploymentReference (
      uint id,
      string  _employeeName,
      string  _companyName,
      string  _nftImageLlink,
      string  _website,
      string  _recommendation,
      address from
    );

    constructor() ERC721("referrals", "ERL") {
    }

    function newEmploymentReference(
        string memory _employeeName,
        string memory _companyName,
        string memory _nftImageLlink,
        string memory _website,
        string memory _recommendation ) public {

        employmentReferenceCounter += 1;
         employmentReferenceList[employmentReferenceCounter] = EmploymentReference(employmentReferenceCounter, _employeeName, _companyName, _nftImageLlink, _website, _recommendation,msg.sender);
         emit NewEmploymentReference(employmentReferenceCounter, _employeeName, _companyName, _nftImageLlink,  _website, _recommendation, msg.sender);
    }

    function mintNft(string memory tokenURI) public returns (uint) {
        employmentReferenceCounter += 1;
        _mint(msg.sender, employmentReferenceCounter);
        _setTokenURI(employmentReferenceCounter, tokenURI);
        return employmentReferenceCounter;
    }
}
