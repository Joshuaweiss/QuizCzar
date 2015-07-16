QuizCzar.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",
  parse: function(data) {
    if (data.answers) {
      this.answers().set(data.answers, {parse: true});
    }
    delete data.answers;
    return data;
  },
  toJSON: function() {
    return {question: _.clone(this.attributes)};
  },
  answers: function() {
    return this._answers = this._answers || new QuizCzar.Collections.Answers();
  }
});
