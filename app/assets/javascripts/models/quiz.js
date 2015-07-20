QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
    if (data.questions) {
      this.questions().set(data.questions, {parse: true});
    }
    if (data.high_score) {
      this.high_score = new QuizCzar.Models.Grade();
      this.high_score.set(data.high_score);
    }
    delete data.questions;
    return data;
  },
  toJSON: function() {
    return {quiz: _.clone(this.attributes)};
  },
  questions: function() {
    return this._questions = this._questions || new QuizCzar.Collections.Questions({quiz: this});
  }
});
