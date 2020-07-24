pragma solidity >=0.6.0;

contract GemToken {
	mapping(address => uint8[64]) balances;
	
	event TransferSingle(address indexed operator, address indexed from, address indexed to, uint8 grade, uint8 amount);
	
	function balancePackedOf(address account) public view returns (uint8[64] memory) {
		return balances[account];
	}
	function balanceOf(address account, uint8 grade) public view returns (uint8) {
		return balances[account][grade-1];
	}
	
	function _increaseBalance(address account, uint8 grade, uint8 amount) internal returns (uint8) {
		require(balances[account][grade-1]+amount >= balances[account][grade-1]);
		balances[account][grade-1] += amount;
		
		return balances[account][grade-1];
	}
	function _decreaseBalance(address account, uint8 grade, uint8 amount) internal returns (uint8) {
		require(balances[account][grade-1] >= amount);
		balances[account][grade-1] -= amount;
		
		return balances[account][grade-1];
	}
	function _mint(address account, uint8 grade, uint8 amount) internal returns (uint8) {
		emit TransferSingle(msg.sender, address(0), account, grade, amount);
		return _increaseBalance(account, grade, amount);
	}
	function _burn(address account, uint8 grade, uint8 amount) internal returns (uint8) {
		emit TransferSingle(msg.sender, account, address(0), grade, amount);
		return _decreaseBalance(account, grade, amount);
	}
	
	function transfer(address to, uint8 grade, uint8 amount) public {
		_decreaseBalance(msg.sender, grade, amount);
		_increaseBalance(to, grade, amount);
		
		emit TransferSingle(msg.sender, msg.sender, to, grade, amount);
	}
}

contract GolemToken {
	uint64 public periodEntry;
	uint64 public periodLv;
	
	address payable public coinbase;
	uint public constant GenerateCost = 10 finney;
	
	uint public totalSupply = 0;
	string public name = 'Golem';
	string public symbol = 'Golem';
	
	struct Golem {
		uint256[] ownerHistorys;
		uint128[] powerHistorys;
	}
	/*
	struct TimedOwner {
		uint64 blockNumber;
		uint32 unused;
		address owner;
	}
	struct TimedPower {
		uint64 blockNumber;
		uint64 power;
	}
	*/
	
	function powerHistorysOf(uint golemId) public view returns (uint128[] memory) {
		return golems[golemId].powerHistorys;
	}
	function ownerHistorysOf(uint golemId) public view returns (uint256[] memory) {
		return golems[golemId].ownerHistorys;
	}
	
	mapping(uint => Golem) golems;
	
	event Transfer(address indexed from, address indexed to, uint indexed golemId);

	constructor(uint64 _periodEntry, uint64 _periodLv) public {
		periodEntry = _periodEntry;
		periodLv = _periodLv;
		
		coinbase = msg.sender;
	}
	
	function generateGolem() public payable returns (uint) {
		require(msg.value >= GenerateCost);
		if(msg.value > GenerateCost) {
			msg.sender.transfer(msg.value - GenerateCost);
		}
		
		uint golemId = ++totalSupply;
		
		golems[golemId] = Golem(new uint256[](1), new uint128[](0));
		golems[golemId].ownerHistorys[0] = uint256((block.number-periodEntry) << 192) | uint256(msg.sender);
		
		emit Transfer(address(0), msg.sender, golemId);
		
		return golemId;
	}
	
	function withdraw() public {
		coinbase.transfer(address(this).balance);
	}
	
	function ownerOf(uint golemId) public view returns (address) {
		return address(golems[golemId].ownerHistorys[ golems[golemId].ownerHistorys.length-1 ]);
	}
	function ownerOf(uint golemId, uint64 blockNumber) public view returns (address) {
		uint l = golems[golemId].ownerHistorys.length;
		for(uint i=0; i<l; ++i) {
			if(uint64(golems[golemId].ownerHistorys[l-1-i]>>192) < blockNumber) {
				return address(golems[golemId].ownerHistorys[l-1-i]);
			}
		}
		return address(0);
	}
	
	function transfer(address to, uint golemId) public {
		require(ownerOf(golemId) == msg.sender && msg.sender != address(0));
		require(to != address(0));
		
		uint256 timedOwner = uint256(block.number << 192) | uint256(to);
		golems[golemId].ownerHistorys.push(timedOwner);
		
		emit Transfer(msg.sender, to, golemId);
	}
	
	function genOf(uint golemId) public view returns (uint64) {
		if(golems[golemId].ownerHistorys.length <= 0) return uint64(0);
		return uint64(golems[golemId].ownerHistorys[0]>>192);
	}
	
	function powerOf(uint golemId) public view returns (uint64) {
		uint l = golems[golemId].powerHistorys.length;
		if(l == 0) return 0;
		return uint64(golems[golemId].powerHistorys[l-1]);
	}
	function powerOf(uint golemId, uint64 blockNumber) public view returns (uint64) {
		uint l = golems[golemId].powerHistorys.length;
		for(uint i=0; i<l; ++i) {
			if(uint64(golems[golemId].powerHistorys[l-1-i]>>64) < blockNumber) {
				return uint64(golems[golemId].powerHistorys[l-1-i]);
			}
		}
		return 0;
	}
}

contract Golem is GolemToken, GemToken {
	mapping(uint => mapping(uint => uint256)) claimBitstrings;

	event GemClaimed(uint indexed golemId, uint64 blockNumber);
	
	constructor(uint64 _periodEntry, uint64 _periodLv) GolemToken(_periodEntry, _periodLv) public {
	}
	
	function infoOf(uint golemId) public view returns (uint64 gen, address owner, uint64 power, uint32 lv, uint32 upgradeUsed) {
		gen = genOf(golemId);
		owner = ownerOf(golemId);
		power = powerOf(golemId);
		lv = lvOf(golemId);
		upgradeUsed = upgradeUsedOf(golemId);
	}
	
	function lvOf(uint golemId) public view returns (uint32 count) {
		uint age = (block.number - uint(genOf(golemId))) / periodLv;
		while(++count <= age) {
			if( count*count/2 > age ) return count;
		}
	}
	function upgradeUsedOf(uint golemId) public view returns (uint32 count) {
		return uint32(golems[golemId].powerHistorys.length);
	}
	
	function upgrade(uint golemId, uint8 gemGrade) public returns (uint64) {
		require(ownerOf(golemId) == msg.sender && msg.sender != address(0));
		require(lvOf(golemId) > upgradeUsedOf(golemId));
		
		_burn(msg.sender, gemGrade, 1);
		
		uint64 power = powerOf(golemId);
		
		require(power+uint64(gemGrade) >= power);
		power += uint64(gemGrade);
		uint128 timedPower = uint128(block.number << 64) | uint128(power);
		
		golems[golemId].powerHistorys.push(timedPower);
		
		return power;
	}
	
	function isClaimed(uint golemId, uint64 blockNumber) public view returns (bool) {
		uint i = (blockNumber/periodEntry)>>8;
		uint mask = uint(1) << uint8(blockNumber/periodEntry);
		return claimBitstrings[golemId][i] & mask > 0;
	}
	function setClaimed(uint golemId, uint64 blockNumber) internal {
		uint i = (blockNumber/periodEntry)>>8;
		uint mask = uint(1) << uint8(blockNumber/periodEntry);
		claimBitstrings[golemId][i] |= mask;
	}
	
	function claimGem(uint golemId, uint64 blockNumber, bytes32 blockHash, bytes memory proof) public returns (uint8 gemGrade) {
		require(blockNumber%periodEntry == 0);
		
		require(blockNumber > genOf(golemId));
		
		require(verifyBlockHash(blockNumber, blockHash, proof));
		
		require(!isClaimed(golemId, blockNumber));
		setClaimed(golemId, blockNumber);
		
		address owner = ownerOf(golemId, blockNumber);
		require(owner == msg.sender && msg.sender != address(0));
		
		(gemGrade, ) = entry(golemId, blockNumber, blockHash);
		_mint(owner, gemGrade, 1);
		
		emit GemClaimed(golemId, blockNumber);
	}
	function verifyBlockHash(uint64 blockNumber, bytes32 blockHash, bytes memory proof) internal view returns (bool) {
		if(blockNumber >= block.number) return false;
		if(blockNumber + 256 >= block.number) return blockhash(blockNumber) == blockHash;
		
		return true;
	}
	
	function entry(uint golemId, uint64 blockNumber, bytes32 blockHash) public view returns (uint8 lv, bytes32 rootHash) {
		rootHash = keccak256(abi.encodePacked(blockHash, golemId));
		uint64 golemPower = powerOf(golemId, blockNumber);
		
		while(++lv < 64) {
			(, uint64 power, uint64 difficulty) = roll(rootHash, lv);
			if(golemPower+power <= difficulty) break;
		}
	}
	function roll(bytes32 rootHash, uint8 lv) public pure returns (uint16[2] memory values, uint64 power, uint64 difficulty) {
		uint ihash = uint(keccak256(abi.encodePacked(rootHash, lv)));
		
		uint64 d = uint64(lv)*32;
		difficulty = d + uint64(lv)*uint64(lv+1)/2;
		values[0] = uint16(ihash%d + 1);
		values[1] = uint16((ihash/d)%d + 1);
		power = values[0]+values[1];
	}
}
