QuizCzar.Views.QuizIndex = Backbone.CompositeView.extend({
  template: JST["quiz/index"],
  initialize: function() {
    this.collection.each(function(quiz){
      this.addQuiz(quiz);
    }.bind(this));

    this.listenTo(this.collection, "add", this.addQuiz);
  },
  addQuiz: function(quiz) {
    this.addSubview(".quiz-table-items", new QuizCzar.Views.QuizIndexItem({model: quiz}));
  },
  render: function() {
    this.$el.html(this.template({quizzes: this.collection}));
    this.attachSubviews();
    return this;
  }
});
