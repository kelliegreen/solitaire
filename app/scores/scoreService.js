angular.module('solitaire').service('scoreService', function ($http) {

  this.getScore = function () {
    if (localStorage.getItem('scores')) {
      return JSON.parse(localStorage.getItem('scores'));
    }
    return { scores: [] };
  };

  this.addScore = function (name, moves) {
    if (name && moves) {
      var scoreObj = this.getScore();
      scoreObj.scores.push({ name: name, moves: moves });
      localStorage.setItem('scores', JSON.stringify(scoreObj));
    } else {
      return;
    }
  };
  
});

