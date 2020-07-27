'use strict';

Vue.component('navComp', {
	props: ['links'],
	data: function() {
		return {
			networks: ['Ropsten', 'Goerli'],
		};
	},
	
	template: '<nav>'
		+ '<slot v-for="(item,i) in links" :key="i">'
		+ 	'<a :href="item.href">{{ item.text }}</a>'
		+ 	'<span v-if="i<links.length-1"> / </span>'
		+ '</slot>'
		+ '<select class="network" @change="onNetworkChange" :value="ContractMetadata.networkName">'
		+ 	'<option v-for="(item,i) in networks" :key="i">{{ item }}</option>'
		+ '</select>'
	+ '</nav>',
	
	methods: {
		onNetworkChange: function(ev){
			NetworkData.setNetwork(ev.target.value);
		},
	},
})