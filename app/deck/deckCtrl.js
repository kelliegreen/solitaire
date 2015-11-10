angular.module('solitaire').controller('deckCtrl', function ($scope, deckService, $state) {

	$scope.piles = {
		pile7: [],
		pile6: [],
		pile5: [],
		pile4: [],
		pile3: [],
		pile2: [],
		pile1: []
	};


// $("#hide").click(function(){
//     $("p").hide();
// });

// $("#show").click(function(){
//     $("p").show();
// });
	// $('#tweet-controls').hide();

	$scope.shufflePile = [];
	$scope.revealPile = [];
	$scope.buttonShow = true;

	$scope.showNewPile = false;
	// var cardCount = 0;

	$scope.reset = function () {
		$state.reload();
		$scope.buttonShow = true;
		// $('.quit').hide();
		// $('.deal').show();
	};

	$scope.newGame = function () {
		// $('.quite').hide();
		// $('.deal').show();
		$scope.buttonShow = false;
		$scope.showNewPile = false;
		deckService.getDeck().then(function (response) {
			$scope.deckId = response.data.deck_id;

			deckService.draw($scope.deckId, 28).then(function (response) {
				for (var i = 0; i < 28; i++) {
					if ($scope.piles.pile7.length < 7) {
						$scope.piles.pile7.push(response.data.cards[i]);
					} else if ($scope.piles.pile6.length < 6) {
						$scope.piles.pile6.push(response.data.cards[i]);
					} else if ($scope.piles.pile5.length < 5) {
						$scope.piles.pile5.push(response.data.cards[i]);
					} else if ($scope.piles.pile4.length < 4) {
						$scope.piles.pile4.push(response.data.cards[i]);
					} else if ($scope.piles.pile3.length < 3) {
						$scope.piles.pile3.push(response.data.cards[i]);
					} else if ($scope.piles.pile2.length < 2) {
						$scope.piles.pile2.push(response.data.cards[i]);
					} else if ($scope.piles.pile1.length < 1) {
						$scope.piles.pile1.push(response.data.cards[i], response.data.deck_id);
					}
				}
				console.log($scope.piles.pile1);
				console.log($scope.deckId);
				// console.log($scope.piles);
				
				deckService.draw($scope.deckId, 24).then(function (response) {
					$scope.shufflePile = response.data.cards;
					$scope.revealPile = [];
				});
			});
			
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row7 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row6 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row5 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row4 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row3 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row2 = response.data.cards[0].image;
			// });
			// deckService.drawCard($scope.deckId).then(function(response) {
			// 	$scope.row1 = response.data.cards[0].image;
			// });
		});
	};

	$scope.shuffle = function (array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
		
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
		
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};


	$scope.drawCard = function () {
		if ($scope.shufflePile.length > 0) {
			$scope.revealPile.push($scope.shufflePile.pop());
		} else {
			$scope.shufflePile = $scope.shuffle($scope.revealPile);
			$scope.revealPile = [];
		}
		
		// deckService.drawCard($scope.deckId).then(function (response) {
		// 	$scope.newPile = response.data.cards[0].image;
		// 	$scope.showNewPile = true;
		// 	$scope.cardNum = response.data.remaining;
		// 	$scope.shufflePile.push(response.data.cards[0]);
			
		// 	if($scope.cardNum === 0) {
		// 		deckService.shufflePile($scope.sufflePile).then(function() {
						
		// 		});	
		// 	}
			
		// 	deckService.shufflePile().then(function() {
		// 		if ($scope.cardNum === 0) {
		// 			deckService.shuffle($scope.deckId, $scope.cardNum).then(function (response) {
		// 				$scope.cardShuffle = response;
		// 				$scope.response.data.remaining = $scope.cardNum;
		// 				// console.log(response.data.remaining);
		// 			});
		// 		}
		// 	});
		// });
	};
});