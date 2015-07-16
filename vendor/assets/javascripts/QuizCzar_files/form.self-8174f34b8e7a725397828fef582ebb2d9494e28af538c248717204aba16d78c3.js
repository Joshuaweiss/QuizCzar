QuizCzar.Views.AnswerForm = Backbone.View.extend({
  template: JST["answer/form"],
  tagName: "textarea",
  className: "unstyled",
  attributes: {
    name: "answer[answer]"
  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
