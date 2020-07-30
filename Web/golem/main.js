'use strict';

const entryPerPage = 25;
var offset = false;

let vm;

let golemId = location.search.substr(1);
let golem = {};

window.addEventListener('load', onLoaded);

async function onLoaded() {
	let response = await enableEth();
	if(response.error) {
		alert(response.error);
		return;
	}
	
	await initContract();
	golem = await getGolem(contract, golemId);
	
	if(!golem) return;
	
	golem.isOwned = golem.owner == web3.eth.defaultAccount;
	
	let ownerHistory = await getGolemOwnerHistory(contract, golemId);
	let powerHistory = await getGolemPowerHistory(contract, golemId);

	golem.claimedBnums = await getGolemClaimedBlockNumbers(contract, golemId);
	
	golem.entrys = [];
	let ethBnum = await getAsync(web3.eth.getBlockNumber);
	let count = 0;
	for(let n = ethBnum - ethBnum%contract.periodEntry; n>=golem.gen; n-=contract.periodEntry) {
		let entry = {
			bnum:n,
		};
		while(ownerHistory.length > 0 && ownerHistory[ownerHistory.length-1].bnum >= n) {
			ownerHistory.pop();
		}
		while(powerHistory.length > 0 && powerHistory[powerHistory.length-1].bnum >= n) {
			powerHistory.pop();
		}
		
		entry.owner = ownerHistory.length<=0 ? null : ownerHistory[ownerHistory.length-1].owner;
		entry.power = powerHistory.length<=0 ? 0 : powerHistory[powerHistory.length-1].power;
		entry.lv = lvOfAge(n, golem.gen);
		
		golem.entrys.push(entry);
		
		if(++count >= entryPerPage) break;
	}

	buildView();
}

function buildView() {
	vm = new Vue({
		el: 'main',
		render: function(e) {
			return e('golemDetail', {props:{golem:golem}});
		},
		
	})
}
