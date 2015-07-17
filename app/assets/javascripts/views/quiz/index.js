QuizCzar.Views.QuizIndex = Backbone.CompositeView.extend({
  template: JST["quiz/index"],
  initialize: function() {
    this.setQuizzes()

    this.listenTo(this.collection, "add", this.addQuiz);
    this.listenTo(this.collection, "sync", this.setQuizzes);
    this.listenTo(this.collection, "remove", this.removeQuiz);
  },
  setQuizzes: function(){
    this.removeSubviews(".quiz-table-items")
    this.collection.each(this.addQuiz.bind(this));
  },
  addQuiz: function(quiz) {
    this.addSubview(".quiz-table-items", new QuizCzar.Views.QuizIndexItem({model: quiz}));
  },
  removeQuiz: function(quiz) {
    this.removeModelSubview(".quiz-table-items", quiz);
  },
  render: function() {
    this.$el.html(this.template({quizzes: this.collection}));
    this.attachSubviews();
    this.$(".quiz-table-items").prepend(JST["quiz/index_headers"]());
    return this;
  }
});
