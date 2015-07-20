QuizCzar.Collections.Quizzes = Backbone.Collection.extend({
  url: "/api/quizzes",
  model: QuizCzar.Models.Quiz
});

QuizCzar.recentlyViewedQuizzes = new QuizCzar.Collections.Quizzes();
