QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["question/thumb"],
  tagName: "li",
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
})
