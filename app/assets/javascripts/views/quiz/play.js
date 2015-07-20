QuizCzar.Views.QuizPlay = Backbone.View.extend({
  template: JST["play_quiz/play"],
  tagName: "section",
  className: "quiz-play",
  events: {
    "click button" : "submit"
  },
  submit: function(event) {
    event.preventDefault();
    var data = this.$("form").serializeJSON();
    $.ajax({
      url: "/api/quizzes/" + this.model.id + "/grades",
      method: "post",
      data: data,
      success: function(data) {
        QuizCzar.lastGrades = new QuizCzar.Collections.Grades(data);
        Backbone.history.navigate(
          "#quizzes/" + this.model.id + "/grades",
          {trigger: true}
        )
      }.bind(this)
    })
  },
  render: function(){
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
