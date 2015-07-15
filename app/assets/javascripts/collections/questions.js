QuizCzar.Collections.Questions = Backbone.Collection.extend({
  url: "/api/questions",
  model: QuizCzar.Models.Question
});
