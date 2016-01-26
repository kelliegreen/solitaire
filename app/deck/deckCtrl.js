angular.module('solitaire').controller('deckCtrl', function ($scope, deckService, scoreService, $state) {

	$scope.piles = {
		pile7: [],
		pile6: [],
		pile5: [],
		pile4: [],
		pile3: [],
		pile2: [],
		pile1: []
	};
	$scope.fourPiles = {
		fourPile1: [],
		fourPile2: [],
		fourPile3: [],
		fourPile4: []
	};

	$scope.totalMoves = 0;
	$scope.shufflePile = [];
	$scope.revealPile = [];
	$scope.buttonShow = true;
	$scope.showNewPile = false;
	$scope.submitShow = false;
  $scope.previousCard = false;
	// $scope.isActive = false;

	$scope.reset = function () {
		$state.reload();
		$scope.buttonShow = true;
	};


	$scope.newGame = function () {
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
						$scope.piles.pile1.push(response.data.cards[i]);
					}
				}

				// $scope.cardHide = function (pile, index, card) {
				// 	console.log();
				// 	if ((pile.length - 1) === index) {
				// 		$scope.showCard = true;
				// 		return;
				// 	} else {
				// 		$scope.showCard = false;
				// 		return;
				
				// return 'http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg';
				// 	}
				// };
				
				
				
				
				
				// $scope.cardHide = function (pile, index, card) {
				// 	if ((pile.length - 1) === index) {
				// 			index.image = card.image;
				// 			$scope.cardHide = false;
				// 		// return 'http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg';
				// 	// } else if (pile[index].image === card.image) {
				// 	// 	return card.image;
				// 	}else {
				// 		return card.image;
				// 	} 
				// };
				deckService.draw($scope.deckId, 24).then(function (response) {
					$scope.shufflePile = response.data.cards;
					// console.log($scope.shufflePile.length);
					$scope.revealPile = [];
					$scope.totalMoves = 0;
				});
			});
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
		// console.log($scope.shufflePile.length);
	};


	$scope.cardHide = function (pile, index, card) {
		if (card.flipped || (pile.length - 1) === index) {
			return card.image;
		} else {
			return 'http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg';
		}
		return;
	};




	$scope.placeholderClick = function (pile) {
		if (Object.keys($scope.target).length !== 0) {
			var cardToMove = $scope.target.pile.splice($scope.target.index, $scope.target.pile.length + 1);
			for (var i = 0; i < cardToMove.length; i++) {
				pile.push(cardToMove[i]);
			}
			$scope.target = {};
		}
	};

	$scope.pileCount = 0;

	$scope.placeholderClick2 = function (pile, index) {
		if (pile.length === undefined) {
			pile.length = 0;
		}

		if (Object.keys($scope.target).length !== 0 && pile.length === parseInt($scope.target.card.value) - 1) {
			var cardToMove = $scope.target.pile.splice($scope.target.index, $scope.target.pile.length + 1);
			for (var i = 0; i < cardToMove.length; i++) {
				pile.push(cardToMove[i]);
			}
			$scope.target = {};
			$scope.totalMoves++;
			$scope.pileCount++;
		} else {
			$scope.target = {};
		}
		if ($scope.pileCount > 51) {
			alert('You Win!');
			$scope.submitShow = true;
		}
		console.log($scope.pileCount);

	};


	$scope.submit = function (name, moves) {
		$scope.name = "";
		scoreService.addScore(name, moves);
		$state.go('high-scores');
	};

	$scope.target = {};

	$scope.moveCards = function (pile, card, index) {
    // console.log(card);
    // card.style.border = "1px solid red";
		// if card is active
			// card is not active
		// else
			// card is active		
		// if (pile[index]) {
		// 	$scope.showCard = true;
		// }
    
    if($scope.previousCard) {
      $scope.previousCard.isActive = false;
    }
    card.isActive = true;
    $scope.previousCard = card;
    
		if (pile[index].value === "JACK") {
			pile[index].value = 11;
		}
		if (pile[index].value === "QUEEN") {
			pile[index].value = 12;
		}
		if (pile[index].value === "KING") {
			pile[index].value = 13;
		}
		if (pile[index].value === "ACE") {
			pile[index].value = 1;
		}
		if (Object.keys($scope.target).length !== 0 && card.code !== $scope.target.card.code && parseInt($scope.target.card.value) + 1 == pile[index].value && pile !== $scope.revealPile) {
			pile[index].flipped = true;
			// card.isActive = true;

			$scope.cardToMove = $scope.target.pile.splice($scope.target.index, $scope.target.pile.length + 1);
			for (var i = 0; i < $scope.cardToMove.length; i++) {
				pile.push($scope.cardToMove[i]);
				$scope.totalMoves++;
			}
			$scope.target = {};
      card.isActive = false;
		} else if (Object.keys($scope.target).length === 0) {
			$scope.target = { pile: pile, card: card, index: index };
		} else if (Object.keys($scope.target).length > 1 && card.code === $scope.target.card.code) {
			$scope.target = {};
      card.isActive = false;
		} else {
			$scope.target = {};
      card.isActive = false;
		}
	};
});