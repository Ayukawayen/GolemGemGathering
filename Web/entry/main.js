'use strict';

const entryPerPage = 25;
var offset = false;

let vm;

let [golemId, bnum] = location.search.substr(1).split('/');
let entry = {};

window.addEventListener('load', onLoaded);

async function onLoaded() {
	await enableEth();
	
	await initContract();
	entry = await getEntry(contract, golemId, bnum);

	entry.golemId = golemId;
	entry.bnum = bnum;
	entry.golemPower = await powerOf(contract, golemId, bnum);
	entry.levels = {};
	for(let lv=1;lv<=entry.grade;++lv) {
		entry.levels[lv] = await getLevel(contract, entry.rootHash, lv);
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
