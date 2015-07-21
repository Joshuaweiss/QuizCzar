QuizCzar.Views.GradeShow = Backbone.CompositeView.extend({
  template: JST["grade/show"],
  className:"grade-show",
  initialize: function(){
    this.addSubview(
      ".grades-index-info",
      new QuizCzar.Views.GradeIndex({
        collection: this.collection
      })
    );
    this.model = this.collection.last();
  },
  exit: function(){
    Backbone.history.navigate("#quizzes/" + this.collection.quiz.id,
      {trigger: true})
  },
  render: function(){
    this.$el.html(this.template({grade: this.model}));
    this.attachSubviews()
    return this;
  }
});
