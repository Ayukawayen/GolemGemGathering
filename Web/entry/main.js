'use strict';

const entryPerPage = 25;
var offset = false;

let vm;

let [golemId, bnum] = location.search.substr(1).split('/');
let entry = {};

window.addEventListener('load', onLoaded);

async function onLoaded() {
	let response = await enableEth();
	if(response.error) {
		alert(response.error);
		return;
	}
	
	await initContract();
	entry = await getEntry(contract, golemId, bnum);

	entry.bnum = bnum;
	entry.golem = {
		id: golemId,
		lv: await lvOf(contract, golemId, bnum),
		power: await powerOf(contract, golemId, bnum),
	};
	
	entry.stages = {};
	for(let st=2;st<=entry.st;++st) {
		if(st > 64) break;
		entry.stages[st] = await getStage(contract, entry.rootHash, st, entry.golem.lv, entry.golem.power);
	}

	buildView();
}

function buildView() {
	vm = new Vue({
		el: 'main',
		render: function(e) {
			return e('entry', {props:{entry:entry}});
		},
		
	})
}
