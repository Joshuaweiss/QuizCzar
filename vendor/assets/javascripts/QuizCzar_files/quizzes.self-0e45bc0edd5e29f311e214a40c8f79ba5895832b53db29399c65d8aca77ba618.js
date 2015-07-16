QuizCzar.Collections.Quizzes = Backbone.Collection.extend({
  url: "/api/quizzes",
  model: QuizCzar.Models.Quiz
});

QuizCzar.myQuizzes = new QuizCzar.Collections.Quizzes();
