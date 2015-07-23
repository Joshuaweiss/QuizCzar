QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
    if (data.questions) {
      this.questions().set(data.questions, {parse: true});
      delete data.questions;
    }
    if (data.grades) {
      this.grades().reset(data.grades);
      delete data.grades;
    }
    if (data.high_score) {
      this.high_score = new QuizCzar.Models.Grade();
      this.high_score.set(data.high_score);
      delete data.high_score;
    }
    if (data.user) {
      QuizCzar.recentlyViewedUsers.add(data.user);
      this.user = QuizCzar.recentlyViewedUsers.get(data.user.id);
      this.user.quizzes().add(this, {merge: true});
      delete data.user;
    }
    return data;
  },
  toJSON: function() {
    return {quiz: _.clone(this.attributes)};
  },
  grades: function() {
    return this._grades = this._grades || new QuizCzar.Collections.Grades({quiz: this});
  },
  questions: function() {
    return this._questions = this._questions || new QuizCzar.Collections.Questions({quiz: this});
  }
});
