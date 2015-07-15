QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
  },
  questions: function() {
    return this._questions = this._questions || _([]);
  }
});
