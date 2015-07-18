QuizCzar.Views.QuizShow = Backbone.View.extend({
  template: JST["quiz/show"],
  className: "quiz-show-view",
  events: {
    "click .take-quiz-icon" : "playQuiz",
    "click .take-quiz-icon ~ label" : "playQuiz"
  },
  playQuiz: function() {
    Backbone.history.navigate("#quizzes/"+ this.model.id +"/play", {trigger: true});
  },
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
