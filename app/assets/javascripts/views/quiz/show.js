QuizCzar.Views.QuizShow = Backbone.View.extend({
  template: JST["quiz/show"],
  className: "quiz-show-view",
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
