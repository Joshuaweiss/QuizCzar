QuizCzar.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",
  parse: function(data) {
    if (data.answers) {
      this._answers = new QuizCzar.Collections.Answers(data.answers);
    }
    delete data.answers;
    return data;
  },
  questions: function() {
    return this._questions = this._questions || _([]);
  }
});
