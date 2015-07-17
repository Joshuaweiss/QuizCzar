QuizCzar.Collections.Quizzes = Backbone.Collection.extend({
  url: "/api/quizzes",
  model: QuizCzar.Models.Quiz,
  comparator: function(quiz){
    return -quiz.get("updated_at");
  },
  getOrFetch: function(id, callback){
    var quizzes = this;
    var quiz = quizzes.get(id);
    if (quiz) {
      quiz.fetch({
        success: function(){
          quizzes.add(quiz, {merge: true});
          if (callback) callback(quiz);
        }
      });
    } else {
      quiz = new QuizCzar.Models.Quiz({id: id});
      quiz.fetch({
        success: function(){
          quizzes.add(quiz, {merge: true});
          if (callback) callback(quiz);
        }
      });
    }

    return quiz;
  }
});

QuizCzar.myQuizzes = new QuizCzar.Collections.Quizzes();
