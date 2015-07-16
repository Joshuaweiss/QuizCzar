QuizCzar.Collections.Answers = Backbone.Collection.extend({
  url: "/api/answers",
  model: QuizCzar.Models.Answer,
  comparator: function (obj) {
    return !obj.get("correct");
  }
});
