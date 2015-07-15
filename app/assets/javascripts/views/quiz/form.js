QuizCzar.Views.QuizForm = Backbone.CompositeView.extend({
  template: JST["quiz/form"],
  initialize: function() {
    this.addSubview(".quiz-cards", new QuizCzar.Views.QuestionsIndex({collection: this.model.questions()}));
  },
  render: function() {
    debugger;
    this.$el.html(this.template({quiz: this.model}));
    this.attachSubviews();
    return this;
  }
});
