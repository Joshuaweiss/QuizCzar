QuizCzar.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  className: "user-show",
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
