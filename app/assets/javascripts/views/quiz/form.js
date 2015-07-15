QuizCzar.Views.QuizForm = Backbone.View.extend({
  template: JST["quiz/form"],
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
