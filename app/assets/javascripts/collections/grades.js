QuizCzar.Collections.Grades = Backbone.Collection.extend({
  initialize: function(options){
    this.quiz = options.quiz;
  },
  url: function() {
    return this.quiz.url() + "/grades"
  },
  model: QuizCzar.Models.Grade,
  comparator: function (obj) {
    return !obj.get("created_at");
  }
});
