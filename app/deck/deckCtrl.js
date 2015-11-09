angular.module('solitaire').controller('deckCtrl', function ($scope, deckService) {
	$scope.newGame = function () {
		deckService.getDeck().then(function (response) {
			$scope.deckId = response.data.deck_id;
			console.log($scope.deckId);
		});
	};


	$scope.drawCard = function () {
		deckService.drawCard($scope.deckId).then(function (response) {
			$scope.newPile = response.data.cards[0].image;
			console.log(response.data.cards[0].image);
			$scope.cardNum = response.data.remaining;
			console.log($scope.cardNum);
			if ($scope.cardNum === 0) {
				deckService.shuffle($scope.deckId).then(function (response) {
					$scope.cardShuffle = response;
					// console.log(response);
				});
			}
		});
	};
});