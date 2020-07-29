'use strict';

Vue.component('golemDetail', {
	props: ['golem'],
	data: function(){
		return {
			links:[
				{href:'../home', text:'Home'},
				{href:false, text:`Golem #${golem.id}`},
			],
		};
	},
	
	template: '<main class="golemDetail">'
		+ '<navComp :links="links"></navComp>'
		+ '<div class="openAll"><button @click="onOpenAllClick">全部顯示</button></div>'
		+ '<div class="entryList">'
		+ 	'<div class="entry header">'
		+ 		'<div class="bnum">Block</div>'
		+ 		'<div class="power">Power</div>'
		+ 		'<div class="owner">Owner</div>'
		+ 		'<div class="grade">Result</div>'
		+ 	'</div>'
		+ 	'<entry v-for="(entry,i) in golem.entrys" :entry="entry" :golem="golem" :key="i">'
		+ 	'</entry>'
		+ '</div>'
	+ '</main>',
	filters: {
	},
	
	methods: {
		onOpenAllClick: function(){
			document.querySelectorAll('.entry .grade').forEach((item)=>{
				item.click();
			});
		},
	},
})

Vue.component('entry', {
	props: ['entry', 'golem'],
	data: function() {
		let result = JSON.parse(localStorage.getItem(this.getStorageKey())) || this.wrapStorageItem();
		result.isClaimed = this.golem.claimedBnums.includes(this.entry.bnum);
		return result;
	},
	
	template: '<div class="entry">'
		+ '<div class="bnum"><a :href="entry.bnum | entryHref">{{ entry.bnum }}</a></div>'
		+ '<div class="power">{{ entry | entryPower }}</div>'
		+ '<div class="owner">{{ entry | entryOwner }}</div>'
		+ '<div class="grade" @click="onGradeClick">{{ computedGrade }}</div>'
		+ '<div class="claim">'
		+ 	'<button v-if="computedClaimable" @click="onClaimClick">{{ computedClaim }}</button>'
		+ 	'<span v-else>{{ computedClaim }}</span>'
		+ '</div>'
	+ '</div>',
	
	filters: {
		entryHref: function(bnum) {
			return `../entry/?${golem.id}/${bnum}`
		},
		entryPower: function(entry) {
			return `2D${sideOf(entry.lv)}+${entry.power}`;
		},
		entryOwner: function(entry) {
			return entry.owner;
		},
	},
	
	computed: {
		computedGrade: function() {
			if(!this.grade) return '??????';
			return `Grade ${this.grade}`;
		},
		computedClaim: function() {
			if(!this.grade) return '';
			if(this.entry.owner != web3.eth.defaultAccount) return '非持有者';
			return this.isClaimed ? '已領取' : '領取';
		},
		computedClaimable: function() {
			if(!this.grade) return false;
			if(this.entry.owner != web3.eth.defaultAccount) return false;
			return !this.isClaimed;
		},
	},
	
	methods: {
		onGradeClick: async function(){
			if(this.grade) return;
			
			this.grade = (await getEntry(contract, this.golem.id, this.entry.bnum)).st-1;
			
			this.store();
		},
		
		onClaimClick: async function(){
			if(this.entry.owner != web3.eth.defaultAccount) return;
			if(this.isClaimed) return;
			
			this.isClaimed = await isClaimed(contract, this.golem.id, this.entry.bnum);

			if(this.isClaimed) {
				return;
			}
			
			claimGem(contract, this.golem.id, this.entry.bnum);
		},
		
		getStorageKey: function() {
			return `entryReward/${this.golem.id}/${this.entry.bnum}@${ContractMetadata.addr}`;
		},
		store: function(){
			localStorage.setItem(this.getStorageKey(), JSON.stringify(this.wrapStorageItem()))
		},
		wrapStorageItem: function(){
			return {
				grade: this.grade,
			};
		},
	},
})
