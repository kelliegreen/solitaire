angular.module('solitaire', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/app/home/homeTmpl.html',
		})
		.state('game', {
			url:'/game',
			templateUrl: '/app/deck/deckTmpl.html',
			controller: 'deckCtrl'
		})
		.state('high-scores', {
			url: '/high-scores',
			template: '<score-dir><>/score-dir',
			controller: 'scoreCtrl'
		});
	$urlRouterProvider.otherwise('/');
	
});