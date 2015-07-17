QuizCzar.Views.QuizPlay = Backbone.View.extend({
  template: JST["play_quiz/play"],
  tagName: "section",
  className: "quiz-play-view",
  render: function(){
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
