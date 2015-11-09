angular.module('solitaire').controller('deckCtrl', function ($scope, deckService) {

	$scope.showNewPile = false;

	$scope.newGame = function () {
		$scope.showNewPile = false;
		deckService.getDeck().then(function (response) {
			$scope.deckId = response.data.deck_id;
			// console.log($scope.deckId);
			deckService.firstPile($scope.deckId).then(function (response) {
				$scope.pileOne = response.data.cards[0].image;
			});
			deckService.secondPile($scope.deckId).then(function(response) {
				$scope.pileTwo = response.data.cards[0, 1].image;
			});
		});
	};


	$scope.drawCard = function () {
		deckService.drawCard($scope.deckId).then(function (response) {
			$scope.newPile = response.data.cards[0].image;
			$scope.showNewPile = true;
			// console.log(response.data.cards[0].image);
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