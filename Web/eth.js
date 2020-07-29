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
	
	ethereum.autoRefreshOnNetworkChange = false;
	
	let networkVersion = await ethereum.request({ method: 'net_version' });
	if(!NetworkData[networkVersion]) {
		let supportedNetworkNames = [];
		for(let k in NetworkData) {
			supportedNetworkNames.push(`${NetworkData[k].networkName}(${k})`);
		}
		return {error:`Network error. Should be ${supportedNetworkNames.join(' or ')} test-net. You are using (${networkVersion})`};
	}
	
	ContractMetadata.setNetwork(ethereum.networkVersion);
	
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
