QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
    if (data.questions) {
      this.questions().set(data.questions, {parse: true});
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
