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

	entry.golemId = golemId;
	entry.bnum = bnum;
	entry.golemPower = await powerOf(contract, golemId, bnum);
	entry.stages = {};
	for(let i=1;i<=entry.grade;++i) {
		entry.stages[i] = await getStage(contract, entry.rootHash, i);
	}
console.log(entry);

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
