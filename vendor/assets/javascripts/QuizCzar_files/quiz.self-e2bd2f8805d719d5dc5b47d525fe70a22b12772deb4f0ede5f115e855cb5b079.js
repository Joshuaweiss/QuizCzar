QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
    if (data.questions) {
      this._questions = new QuizCzar.Collections.Questions(data.questions);
    }
    delete data.questions;
    return data;
  },
  questions: function() {
    return this._questions = this._questions || _([]);
  }
});
