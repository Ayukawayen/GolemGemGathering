'use strict';

Vue.component('entry', {
	props: ['entry'],
	
	template: '<main class="entry">'
		+ '<nav>'
		+ 	'<a href="../home">Home</a> / '
		+ 	'<a :href="entry.golem.id | golemIdHref">Golem #{{ entry.golem.id }}</a> / '
		+ 	'<a>Block #{{ entry.bnum }}</a>'
		+ '</nav>'
		+ '<div class="stageList">'
		+ 	'<stage v-for="(stage,i) in entry.stages" :stage="stage" :st="i" :golem="entry.golem" :isClear="i<entry.grade" :key="i">'
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
			props: ['stage', 'st', 'golem', 'isClear'],
			template: '<div class="stage" :clear="isClear">'
				+ '<div class="st">第 {{ st }} 層</div>'
				+ '<div class="item difficulty">'
				+ 	'<div class="value">{{ st | difficulty }}</div>'
				+ 	'<div class="label">難度</div>'
				+ '</div>'
				+ '<div class="item dice" v-for="(v,i) in stage.values" :key="i">'
				+ 	'<div class="value">{{ v }}</div>'
				+ 	'<div class="label">/ d{{ golem.lv | side }}</div>'
				+ '</div>'
				+ '<div class="item golemPower" :digit="golem.power.toString().length">'
				+ 	'<div class="value">+{{ golem.power }}</div>'
				+ 	'<div class="label"></div>'
				+ '</div>'
				+ '<div class="result">'
				+ 	'<div class="power">{{ totalPower() }}</div>'
				+ 	'<div class="clearText">{{ isClear | clear }}</div>'
				+ '</div>'
			+ '</div>',
			
			filters: {
				clear:(value)=>{
					return value ? '通過' : '退卻';
				},
				difficulty:(st)=>{
					return st*64;
				},
				side:(lv)=>{
					return lv*64;
				},
			},
			
			methods: {
				totalPower: function() {
					return this.stage.values.reduce((v,item)=>(v+item), this.golem.power);
				},
			},
		},
	},
})
