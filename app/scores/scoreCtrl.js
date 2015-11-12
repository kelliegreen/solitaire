angular.module('solitaire').controller('scoreCtrl', function ($scope, scoreService) {
	$scope.highScores = scoreService.getScore();
});