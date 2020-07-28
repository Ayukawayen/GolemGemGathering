'use strict';

Vue.component('home', {
	props: ['gems', 'golems'],
	data: function(){
		return {
			links:[
				{href:false, text:`Home`},
			],
		};
	},
	
	template: '<main class="home">'
		+ '<navComp :links="links"></navComp>'
		+ '<div class="golemTitle">Gems [{{ gems | gemAmount }}]</div>'
		+ '<div class="gemList">'
		+ 	'<gem v-for="(gem) in gems" :gem="gem" :key="gem.grade">'
		+ 	'</gem>'
		+ '</div>'
		+ '<div class="golemTitle">Golems [{{ golems.length }}]</div>'
		+ '<div class="golemList">'
		+ 	'<golem v-for="(golem,i) in golems" :golem="golem" :key="i">'
		+ 	'</golem>'
		+ '</div>'
		+ '<div class="genGolem">'
		+ 	'<button @click="onGenGolemClick">Get another Golem for 0.01 ETH({{ ContractMetadata.networkName }})</button>'
		+ '</div>'
	+ '</main>',
	
	filters: {
		gemAmount: function(gems) {
			return gems.reduce((v,item)=>(v+item.amount),0);
		},
	},
	
	methods: {
		onGenGolemClick: function(){
			genGolem(contract);
		},
	},
	
	components: {
		gem: {
			props: ['gem'],
			template: '<div class="gem" @click="onTransferClick" title="發送">'
				+ '<span class="grade">{{ gem.grade | grade }}</span>'
				+ '<span class="amount">{{ gem.amount }}</span>'
			+ '</div>',
			filters: {
				grade: function(value) {
					return `G${value}`;
				},
			},
			
			methods: {
				onTransferClick: function(){
					let amount = prompt(`amount (max=${this.gem.amount}):`);
					if(!amount) return;
					
					let to = prompt(`Send G${this.gem.grade} x${amount} to:`);
					if(!to) return;

					transferGem(contract, to, this.gem.grade, amount);
				},
			},
			
		},
		
		golem: {
			props: ['golem'],
			template: '<div class="golem">'
				+ '<span class="name"><a :href="golem | href">{{ golem | name }}</a></span>'
				+ '<span class="lv">{{ golem | lv }}</span>'
				+ '<span class="power">{{ golem | power }}</span>'
				+ '<span class="dice">{{ golem | dice }}</span>'
				+ '<span class="upgrade"><button :disabled="!isUpgradable()" @click="onUpgradeClick">強化 [{{ golem.lv-golem.upgradeUsed }}]</button></span>'
				+ '<span class="transfer"><button @click="onTransferClick">發送</button></span>'
			+ '</div>',
			filters: {
				href: function(golem) {
					return `../golem/?${golem.id}`;
				},
				name: function(golem) {
					return `Golem #${golem.id}`;
				},
				lv: function(golem) {
					return `Lv${golem.lv}`;
				},
				power: function(golem) {
					return `+${golem.power}`;
				},
				dice: function(golem) {
					return `2D${sideOf(golem.lv)}+${golem.power}`;
				},
			},
			
			methods: {
				onUpgradeClick: function(){
					if(!this.isUpgradable()) return;
					let grade = prompt('Gem Grade:');
					if(!grade) return;

					upgrade(contract, this.golem.id, grade);
				},
				onTransferClick: function(){
					let to = prompt(`Send Golem #${this.golem.id} to:`);
					if(!to) return;

					transferGolem(contract, to, this.golem.id);
				},
				
				isUpgradable: function(){
					return this.golem.upgradeUsed < this.golem.lv;
				},
			},
		},
	},
})
