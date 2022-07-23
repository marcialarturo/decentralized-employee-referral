# Project name

Employment Reference

# Description

Employment Reference is a safeguard for employers and employees to track their professional references, ratings, and job history all in one place. It is a dApp that brings transparency and accountability to all partners. Ultimately, decreasing wasted time and resources. If you are an employee you should be able to find your company and rate its management, installations, equipment, the building, etcetera. If you are an employer you can register your company, provide employment references, and more.

### Website Demo

- https://employment-references.netlify.app/
- Valist Site https://app.valist.io/electrone901/employment-references

# How it's made

Employment Referrals application makes use of the following software:

- `Matic - Polygon Network` enables Employment Referrals application to be a scalable platform with fast transactions. We deployed our app on the Polygon Network.
- `Skale Network` enables our app to be on the Skale Network which is the Ethereum-compatible network perfect for security and scalability.

- `Optimism Network` enables our app to be secure and cost-effective. We deployed our app on the Optimism Network

- `Covalent API` facilitated the retrieval of companies’ NFTs and contracts. The Covalent API endpoints to get all NFTs balance and metadata from a wallet address such as images, contracts name, NFTs images, and balances.

- `Valist` facilitated the process of distributio of our in a secure way.

- `Spheron` made it easy and was the most convenient way to deploy our web app onto a Decentralized Cloud Storage. This allows our users to access our app anywhere in the world.

- `TableLand` made our work easy with the Ethereum network. This allows us to work with a relational database to store Employment references and metadata for EVM chains like Ethereum. We will definitely keep using complex TableLand functions in the future.

- `XMTP` facilitated the process of communication between employers and employees, especially for important employment documents. XMTP allows our users to request employment letters and documents in and seamless and secure way.

* `IPFS NFTStorage` for data storage on IPFS that generates a transaction hash used to create an NFT of a photo.

* `textile/eth-storage`: facilitated a fast way to store metadata for NFTs such: names, locations, description, images, wallet addresses, and more. It was perfect for our use case to save their needs on the textile storage.

* `NFTPort` facilitated the process of rewarding and recognizing the hard work of employees' performance by providing NFT to employees without transaction fees. This is a win-win situation for everyone.

- `Pocket Network` smooths the path of deploying and the hassle of paying big transactions to deploy our app contract to a node using the Matic, Skale, Optimism, and Rinkeby network.

* `Solidity` for the smart contract.
* `OpenZeppelin ERC721` we use the ERC721 template for faster development of our smart contract.

* `Ganache` for local blockchain development.

* `Rinkeby Network` is the network where we deployed our dApp.

* `React Js, Material-ui, Web3` React Js for the frontend, Material-ui, and Web3 to connect to the blockchain.

- `ENS Domains` facilitated the lookup process for searching by tenant’s ENS Domain name. This protocol simplified the user experience of our app by allowing landlords to look up users by domain names instead of copying long crypto addresses.


<!-- here -->

## Inspiration

Employment Reference is a safeguard for employers and employees to track their professional references, ratings, and job history all in one place. It is a dApp that brings transparency and accountability to all partners. Ultimately, decreasing wasted time and resources. If you are an employee you should be able to find your company and rate its management, installations, equipment, the building, etcetera. If you are an employer you can register your company, provide employment references, and more.

## What it does

- Allows employees to rate companies by giving them NFTs
- Owners can register new companies
- Allows users to browse and compare companies installations, management, prices, and environment.
- It gives users a more accurate picture of a company
- Users can send or receive tips for sharing their reviews
- It provides additional information for potential candidates to make a more informed decision before signing a contract.
- Employment Referrals are NFTs
- Easily collect accurate information that is available to the public using blockchain technology
- Employment Referrals is a platform that makes the renting process a little easier while protecting the user's privacy and the transparency of the hiring process.

## How we built it

We use:

- IPFS NFTStorage: stores NFT's image, name, location, prices, reviews, and metadata. The way it works is whenever the user is registering a project the information gets passed to NFTStorage IPFS then the NFTStorage generates a hash called CID that is stored on the smart contract. The CID will be used to retrieve the NFT's data

Covalent API for a quick way to fetch and retrieve NFTs and contract transaction history in a seamless way.

NFTPort for multi-chain NFT minting, and data transparency such as distributing rewards and minting the NFT.

Solidity: Solidity was used for the smart contract together with OpenZeppelin ERC721 for faster development of the smart contract

Chainlink Oracle to compare Employment prices with Chainlink prices.

Hardhat: for local blockchain development

Frontend: React Js for the frontend, Material-UI, and Web3 to connect to the blockchain.

AVAX Network: the network I deployed the app.

## Challenges we ran into

We learned to work with IPFS NFTStorage and hardhat

## Accomplishments that we're proud of

We are proud of the final MVP

## What we learned

We learned to work with IPFS NFTStorage and hardhat

## What's next for NFTs Employment Referral

Polishing the app and bringing it to production



# Personal Notes & Tips
# Covalent

When covalent api gets null fields, I can use the gateway
https://cloudflare-ipfs.com/ipfs/bafkreib2rtsexngzpp3ijbnshwmgmptgdt25v6kjt4kczawokyzzkbpzee
https://cloudflare-ipfs.com/ipfs/bafkreidcanaeesom2q3ixqk32k2h5asvv5ra352rygvgdaoxzf4okth4ra
ipfs://bafkreidcanaeesom2q3ixqk32k2h5asvv5ra352rygvgdaoxzf4okth4ra
## Notes

- npx create-react-app realEstate
- npx hardhat init, basic project, deploy
  `to deploy`
  npx hardhat run scripts/sample-script.js --network matic
  npx hardhat run scripts/sample-script.js --network rinkeby
  npx hardhat run ./scripts/deploy.ts --network localhost
- connect fronent to MetaMask wallet

###  running into hardhat problems
- to clean it run `npx hardhat clean`

# deployed Address

- deployedMaticContract = '0xA266e466FbAF783006758Ee7b5d91ec1E121233C'
- deployedOptimismContract ='0x15036E33e8E8f706fd77A1aC550d28FD58432c1B'
- deployedSkaleContract = ''
- deployedRinkebyContract =''

https://www.whatlandlord.com/login
What do I need to add to my project?
- chainlink price
- deploy frontend to sia decentralized netlify
-

`NFTStorage`: NFTStorage uses marci@yah..
