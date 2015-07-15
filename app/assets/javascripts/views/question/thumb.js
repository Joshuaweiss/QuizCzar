QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["question/thumb"],
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
})
