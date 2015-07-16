QuizCzar.Views.QuizIndex = Backbone.View.extend({
  template: JST["quiz/index"],
  render: function() {
    this.$el.html(this.template({quizzes: this.collection}));
    return this;
  }
});
