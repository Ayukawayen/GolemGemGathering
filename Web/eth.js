'use strict';


async function enableEth() {
	if(!window.ethereum) {
		return {error:'Non-Ethereum browser detected. Consider trying MetaMask.'};
	}
	
	if(ethereum.networkVersion != '3') {
		return {error:'Network error. Should be Ropsten test-net.'};
	}
	
	try {
		await ethereum.enable();
	} catch (error) {
		return {error:error.message};
	}
	
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
