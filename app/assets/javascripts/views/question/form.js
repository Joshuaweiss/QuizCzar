QuizCzar.Views.QuestionForm = Backbone.View.extend({
  template: JST["question/form"],
  tagName: "form",
  className: "question-form",
  initialize: function() {
    var answers = this.model.answers();
    answers.each(function(answer) {
      var answerView = new QuizCzar.View.AnswerForm({model: answer});
      this.addSubview(".answers", answerView);
    }.bind(this));
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
});
