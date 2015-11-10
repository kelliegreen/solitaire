angular.module('solitaire').service('deckService', function ($http) {

        this.getDeck = function () {
                return $http({
                        method: 'GET',
                        url: 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
                });
        };

        this.draw = function (deckId, count) {
                if(!count) {
                    count = 1;    
                }
                return $http({
                        method: 'GET',
                        url: 'http://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + count
                });
        };

        // this.shuffle = function (deckId) {
        //         return $http({
        //                 method: 'GET',
        //                 url: 'http://deckofcardsapi.com/api/deck/' + deckId + '/shuffle/'
        //         });
        // };
        
        // this.shufflePartial = function(cards) {
        //         return $http({
        //                 method: 'GET',
        //                 url: 'http://deckofcardsapi.com/api/deck/new/shuffle/',
        //                 params: cards
        //         });
        // };
        
});