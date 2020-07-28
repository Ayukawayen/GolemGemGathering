'use strict';

Vue.component('entry', {
	props: ['entry'],
	
	data: function(){
		return {
			links:[
				{href:'../home', text:'Home'},
				{href:`../golem/?${entry.golem.id}`, text:`Golem #${entry.golem.id}`},
				{href:false, text:`Block #${entry.bnum}`},
			],
		};
	},
	
	template: '<main class="entry">'
		+ '<navComp :links="links"></navComp>'
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
				+ 	'<div class="value">{{ parseInt(st) | difficulty }}</div>'
				+ 	'<div class="label">難度</div>'
				+ '</div>'
				+ '<div class="item dice" v-for="(v,i) in stage.values" :key="i">'
				+ 	'<div class="value">{{ v }}</div>'
				+ 	'<div class="label">/ D{{ golem.lv | side }}</div>'
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
					return difficultyOf(st);
				},
				side:(lv)=>{
					return sideOf(lv);
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
