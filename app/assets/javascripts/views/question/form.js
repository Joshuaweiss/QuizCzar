QuizCzar.Views.QuestionForm = Backbone.View.extend({
  template: JST["question/form"],
  tagName: "form",
  className: "question-form",
  initialize: function() {
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
});
