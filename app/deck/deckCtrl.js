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
			if ($scope.newPile.typeof === undefined) {
				deckService.shuffle($scope.deckId).then(function (response) {
					$scope.cardShuffle = response;
					// console.log(response);
				});
			}
		});
	};
});