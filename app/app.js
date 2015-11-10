angular.module('solitaire', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/app/home/homeTmpl.html',
			controller: 'homeCtrl'
		})
		.state('game', {
			url:'/game',
			templateUrl: '/app/deck/deckTmpl.html',
			controller: 'deckCtrl'
		})
		.state('high-scores', {
			url: '/high-scores',
			templateUrl: '/app/scores/scoreTmpl.html',
			controller: 'scoreCtrl'
		});
	$urlRouterProvider.otherwise('/');
	
});