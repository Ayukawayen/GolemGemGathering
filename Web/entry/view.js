'use strict';

Vue.component('entry', {
	props: ['entry'],
	
	template: '<main class="entry">'
		+ '<nav>'
		+ 	'<a href="../home">Home</a> / '
		+ 	'<a :href="entry.golemId | golemIdHref">Golem #{{ entry.golemId }}</a> / '
		+ 	'<a>Block #{{ entry.bnum }}</a>'
		+ '</nav>'
		+ '<div class="levelList">'
		+ 	'<level v-for="(level,i) in entry.levels" :level="level" :lv="i" :isSuccess="i<entry.grade" :golemPower="entry.golemPower" :key="i">'
		+ 	'</level>'
		+ '</div>'
	+ '</main>',
	filters: {
		golemIdHref: function(value) {
			return `../golem/?${value}`;
		},
	},
	
	computed: {
	},
	
	methods: {
	},
	
	components: {
		level: {
			props: ['level', 'lv', 'golemPower', 'isSuccess'],
			template: '<div class="level" :success="isSuccess">'
				+ '<div class="lv">第 {{ lv }} 層</div>'
				+ '<div class="item difficulty">'
				+ 	'<div class="value">{{ level.difficulty }}</div>'
				+ 	'<div class="label">難度</div>'
				+ '</div>'
				+ '<div class="item dice" v-for="(v,i) in level.values" :key="i">'
				+ 	'<div class="value">{{ v }}</div>'
				+ 	'<div class="label">/ d{{ lv*32 }}</div>'
				+ '</div>'
				+ '<div class="item golemPower" :digit="golemPower.toString().length">'
				+ 	'<div class="value">+{{ golemPower }}</div>'
				+ 	'<div class="label"></div>'
				+ '</div>'
				+ '<div class="result">'
				+ 	'<div class="power">{{ totalPower() }}</div>'
				+ 	'<div class="success">{{ isSuccess | success }}</div>'
				+ '</div>'
			+ '</div>',
			
			filters: {
				success:(value)=>{
					return value ? '通過' : '退卻';
				},
			},
			
			methods: {
				totalPower: function() {
					return this.level.values.reduce((v,item)=>(v+item), this.golemPower);
				},
			},
		},
	},
})
