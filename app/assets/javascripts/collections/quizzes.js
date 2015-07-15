QuizCzar.Collections.Quizzes = Backbone.Collection.extend({
  url: "/quizzes",
  model: QuizCzar.Models.Quiz
});

QuizCzar.myQuizzes = new QuizCzar.Collections.Quizzes();
