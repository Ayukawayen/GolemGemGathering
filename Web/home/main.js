'use strict';

let vm;

window.addEventListener('load', onLoaded);

let golems = [];
let gems = [];

async function onLoaded() {
	await enableEth();
	
	await initContract();
	golems = await getAccountGolems(contract, web3.eth.defaultAccount);
	
	let gemBalances = await getAccountGemBalances(contract, web3.eth.defaultAccount);
	for(let grade=64;grade>0;--grade) {
		if(!gemBalances[grade]) continue;
		gems.push({grade:grade, amount:gemBalances[grade]});
	}

	buildView();
}

function buildView() {
	vm = new Vue({
		el: 'main',
		render: function(e) {
			return e('home', {props:{golems:golems, gems:gems}});
		},
		
	})
}
