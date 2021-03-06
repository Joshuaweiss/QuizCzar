QuizCzar.Views.QuizIndex = Backbone.CompositeView.extend({
  template: JST["quiz/index"],
  className: "quiz-index-container",
  initialize: function(options) {
    this.viewOptions = options.viewOptions || {};

    this.setQuizzes()

    this.listenTo(this.collection, "add", this.addQuiz);
    this.listenTo(this.collection, "sync", this.setQuizzes);
    this.listenTo(this.collection, "remove", this.removeQuiz);
  },
  setQuizzes: function(){
    this.removeSubviews(".quiz-table-items");
    this.addSubview(".quiz-table-items", new QuizCzar.Views.QuizIndexHeader(this.viewOptions));
    this.collection.each(this.addQuiz.bind(this));
    this.render();
  },
  addQuiz: function(quiz) {
    this.addSubview(".quiz-table-items", new QuizCzar.Views.QuizIndexItem({
      model: quiz,
      viewOptions: this.viewOptions
    }));
  },
  removeQuiz: function(quiz) {
    this.removeModelSubview(".quiz-table-items", quiz);
  },
  render: function() {
    this.$el.html(this.template({quizzes: this.collection, options: this.viewOptions}));
    this.attachSubviews();
    return this;
  }
});
