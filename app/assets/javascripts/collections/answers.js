QuizCzar.Collections.Answers = Backbone.Collection.extend({
  url: "/api/answers",
  model: QuizCzar.Models.Answer,
  initialize: function(options) {
    if (options && options.question) {
      this.question = options.question;
    }
  },
  comparator: function (obj) {
    return !obj.get("correct");
  }
});
