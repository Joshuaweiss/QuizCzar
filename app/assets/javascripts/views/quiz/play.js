QuizCzar.Views.QuizPlay = Backbone.View.extend({
  template: JST["play_quiz/play"],
  tagName: "section",
  className: "quiz-play",
  render: function(){
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
