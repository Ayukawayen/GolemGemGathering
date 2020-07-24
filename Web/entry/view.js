'use strict';

Vue.component('entry', {
	props: ['entry'],
	
	template: '<main class="entry">'
		+ '<nav>'
		+ 	'<a href="../home">Home</a> / '
		+ 	'<a :href="entry.golemId | golemIdHref">Golem #{{ entry.golemId }}</a> / '
		+ 	'<a>Block #{{ entry.bnum }}</a>'
		+ '</nav>'
		+ '<div class="stageList">'
		+ 	'<stage v-for="(stage,i) in entry.stages" :stage="stage" :st="i" :isSuccess="i<entry.grade" :golemPower="entry.golemPower" :key="i">'
		+ 	'</stage>'
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
		stage: {
			props: ['stage', 'st', 'golemPower', 'isSuccess'],
			template: '<div class="stage" :success="isSuccess">'
				+ '<div class="st">第 {{ st }} 層</div>'
				+ '<div class="item difficulty">'
				+ 	'<div class="value">{{ stage.difficulty }}</div>'
				+ 	'<div class="label">難度</div>'
				+ '</div>'
				+ '<div class="item dice" v-for="(v,i) in stage.values" :key="i">'
				+ 	'<div class="value">{{ v }}</div>'
				+ 	'<div class="label">/ d{{ st*32 }}</div>'
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
					return this.stage.values.reduce((v,item)=>(v+item), this.golemPower);
				},
			},
		},
	},
})
