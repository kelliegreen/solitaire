angular.module('solitaire').service('deckService', function ($http) {

        this.getDeck = function () {
                return $http({
                        method: 'GET',
                        url: 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
                });
        };

        this.drawCard = function (deckId) {
                return $http({
                        method: 'GET',
                        url: 'http://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1'
                });
        };

        this.shuffle = function (deckId) {
                return $http({
                        method: 'GET',
                        url: 'http://deckofcardsapi.com/api/deck/' + deckId + '/shuffle/'
                });
        };
});