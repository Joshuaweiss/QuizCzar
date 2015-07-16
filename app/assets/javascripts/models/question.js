QuizCzar.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",
  set: function(data) {
    if (data.answers) {
      this._answers = new QuizCzar.Collections.Answers(data.answers);
    }
    delete data.answers;
    Backbone.Model.prototype.set.call(this, data);
  },
  answers: function() {
    return this._answers = this._answers || _([]);
  }
});
