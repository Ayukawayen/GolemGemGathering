'use strict';


async function enableEth() {
	if(!window.ethereum) {
		return {error:'Non-Ethereum browser detected. Consider trying MetaMask.'};
	}
	try {
		await ethereum.enable();
	} catch (error) {
		return {error:error.message};
	}
	
	if(!NetworkData[ethereum.networkVersion]) {
		let supportedNetworkNames = [];
		for(let k in NetworkData) {
			supportedNetworkNames.push(NetworkData[k].networkName);
		}
		return {error:`Network error. Should be ${supportedNetworkNames.join(' or ')} test-net.`};
	}
	
	ContractMetadata.setNetwork(ethereum.networkVersion);
	
	ethereum.autoRefreshOnNetworkChange = false;
	
	window.web3 = new Web3(ethereum);
	
	return {};
}

async function getAsync(inner, args) {
	args = args || [];
	
	return new Promise((resolve, reject) => {
		args.push((error, response) => {
			if(error) {
				reject(error);
				return;
			}
			resolve(response);
		});
		
		inner.apply(null, args);
	});
}
