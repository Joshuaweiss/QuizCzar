QuizCzar.Views.QuizShow = Backbone.View.extend({
  template: JST["quiz/show"],
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
