'use strict';

Vue.component('navComp', {
	props: ['links'],
	
	template: '<nav>'
		+ '<slot v-for="(item,i) in links" :key="i">'
		+ 	'<a :href="item.href">{{ item.text }}</a>'
		+ 	'<span v-if="i<links.length-1"> / </span>'
		+ '</slot>'
	+ '</nav>',
	
	methods: {
	},
})