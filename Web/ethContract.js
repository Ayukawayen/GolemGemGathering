'use strict';

const NetworkData = {
	'3': {
		networkName: 'Ropsten',
		addr: '0xb538346edea06dbe177e4d613e589d5b3574ca05',
		created: 8390559,
	},
	'5': {
		networkName: 'Goerli',
		addr: '0x8d2f60a1b41fdffe89f0dce887d07ef8c8c177f1',
		created: 3130490,
	},
};

const ContractMetadata = {
	setNetwork: (networkVersion)=>{
		ContractMetadata.networkVersion = networkVersion;
		ContractMetadata.networkName = NetworkData[networkVersion].networkName;
		ContractMetadata.addr = NetworkData[networkVersion].addr;
		ContractMetadata.created = NetworkData[networkVersion].created;
	},
	
	abi: 
[
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_periodEntry",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "_periodLv",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			}
		],
		"name": "GemClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "grade",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "amount",
				"type": "uint8"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "GenerateCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "grade",
				"type": "uint8"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balancePackedOf",
		"outputs": [
			{
				"internalType": "uint8[64]",
				"name": "",
				"type": "uint8[64]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			},
			{
				"internalType": "bytes32",
				"name": "blockHash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "proof",
				"type": "bytes"
			}
		],
		"name": "claimGem",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "gemGrade",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coinbase",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			},
			{
				"internalType": "bytes32",
				"name": "blockHash",
				"type": "bytes32"
			}
		],
		"name": "entry",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "st",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "rootHash",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "genOf",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "generateGolem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "infoOf",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "gen",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "power",
				"type": "uint64"
			},
			{
				"internalType": "uint32",
				"name": "lv",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "upgradeUsed",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			}
		],
		"name": "isClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			}
		],
		"name": "lvOf",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "count",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "lvOf",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "count",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "ownerHistorysOf",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "periodEntry",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "periodLv",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "powerHistorysOf",
		"outputs": [
			{
				"internalType": "uint128[]",
				"name": "",
				"type": "uint128[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "powerOf",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "blockNumber",
				"type": "uint64"
			}
		],
		"name": "powerOf",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "rootHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "st",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "gLv",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "gPower",
				"type": "uint64"
			}
		],
		"name": "roll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isClear",
				"type": "bool"
			},
			{
				"internalType": "uint16[2]",
				"name": "values",
				"type": "uint16[2]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "grade",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "amount",
				"type": "uint8"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "gemGrade",
				"type": "uint8"
			}
		],
		"name": "upgrade",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "golemId",
				"type": "uint256"
			}
		],
		"name": "upgradeUsedOf",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "count",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
],
};

var contract;

function sideOf(lv) {
	return (lv)*(lv);
}
function difficultyOf(st) {
	return (st)*(st);
}

async function initContract() {
	contract = web3.eth.contract(ContractMetadata.abi).at(ContractMetadata.addr);
	contract.periodEntry = web3.toDecimal(await getAsync(contract.periodEntry));
	contract.periodLv = web3.toDecimal(await getAsync(contract.periodLv));
	contract.GenerateCost = await getAsync(contract.GenerateCost);
}

async function claimGem(contract, golemId, blockNumber) {
	let block = await getAsync(web3.eth.getBlock, [blockNumber]);
	getAsync(contract.claimGem, [golemId, blockNumber, block.hash, '']);
}

async function upgrade(contract, golemId, grade) {
	getAsync(contract.upgrade, [golemId, grade]);
}

async function getEntry(contract, golemId, blockNumber) {
	let block = await getAsync(web3.eth.getBlock, [blockNumber]);
	let response = await getAsync(contract.entry, [golemId, blockNumber, block.hash]);
	return {
		st: web3.toDecimal(response[0]),
		rootHash: response[1],
	};
}
async function getStage(contract, rootHash, st, golemLv, golemPower) {
	let response = await getAsync(contract.roll, [rootHash, st, golemLv, golemPower]);

	return {
		isClear: response[0],
		values: response[1].map(web3.toDecimal),
	};
}
async function lvOf(contract, golemId, blockNumber) {
	return web3.toDecimal(await getAsync(contract.lvOf, [golemId, blockNumber]));
}
async function powerOf(contract, golemId, blockNumber) {
	return web3.toDecimal(await getAsync(contract.powerOf, [golemId, blockNumber]));
}
async function isClaimed(contract, golemId, blockNumber) {
	return await getAsync(contract.isClaimed, [golemId, blockNumber]);
}
async function getGolemClaimedBlockNumbers(contract, golemId) {
	return new Promise((resolve, reject) => {
		contract.GemClaimed({golemId:golemId}, {fromBlock:ContractMetadata.created, toBlock:'latest', }).get(function(error, response) {
			if(error) {
				reject(error);
				return;
			}
			
			let result = response.map((item)=>(web3.toDecimal(item.args.blockNumber)));
			resolve(result);
		});
	});
}


async function genGolem(contract) {
	getAsync(contract.generateGolem, [{value:contract.GenerateCost}]);
}
async function transferGolem(contract, to, golemId) {
	let abi = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"golemId","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}] ;
	let contractGolemToken = web3.eth.contract(abi).at(ContractMetadata.addr);
	getAsync(contractGolemToken.transfer, [to, golemId]);
}
async function transferGem(contract, to, grade, amount) {
	getAsync(contract.transfer, [to, grade, amount]);
}


async function getGolem(contract, id) {
	let info = await getAsync(contract.infoOf, [id]);
	return {
		id: id,
		gen: web3.toDecimal(info[0]),
		owner: info[1],
		power: web3.toDecimal(info[2]),
		lv: web3.toDecimal(info[3]),
		upgradeUsed: web3.toDecimal(info[4]),
	};
}
async function getGolemOwnerHistory(contract, golemId) {
	let response = await getAsync(contract.ownerHistorysOf, [golemId]);
	return response.map((item)=>{
		return {
			bnum: web3.toDecimal(item.divToInt(web3.toBigNumber(2).pow(192))),
			owner: web3.toHex(item.mod(web3.toBigNumber(2).pow(160)))
		};
	});
}
async function getGolemPowerHistory(contract, golemId) {
	let response = await getAsync(contract.powerHistorysOf, [golemId]);
	return response.map((item)=>{
		return {
			bnum: web3.toDecimal(item.divToInt(web3.toBigNumber(2).pow(64))),
			power: web3.toDecimal(item.mod(web3.toBigNumber(2).pow(64)))
		};
	});
}

async function getAccountGemBalances(contract, account) {
	let response = await getAsync(contract.balancePackedOf, [account]);
	response.unshift(0);
	return response.map(web3.toDecimal);
}

async function getAccountGolems(contract, account) {
	let receiveds = await getAccountReceivedGolemIds(contract, account);
	receiveds.sort();
	let result = [];
	for(let i=0;i<receiveds.length;++i) {
		let golem = await getGolem(contract, receiveds[i]);
		if(golem.owner != account) continue;
		result.push(golem);
	}

	return result;
}

async function getAccountReceivedGolemIds(contract, account) {
	return new Promise((resolve, reject) => {
		contract.Transfer({to:account}, {fromBlock:ContractMetadata.created, toBlock:'latest', }).get(function(error, response) {
			if(error) {
				reject(error);
				return;
			}
			
			let result = response.map((item)=>(web3.toDecimal(item.args.golemId)));
			resolve(result);
		});
	});
}