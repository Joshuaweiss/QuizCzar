QuizCzar.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  parse: function(data) {
    this.quizzes().set(data.quizzes, {parse: true});
    delete data.quizzes;
    return data;
  },
  quizzes: function() {
    if (this._quizzes) return this._quizzes;
    return this._quizzes = new QuizCzar.Collections.Quizzes({user: this});
  }
});
