QuizCzar.Collections.Quizzes = Backbone.Collection.extend({
  initialize: function(options){
    if (options && options.user) this.user = options.user;
  },
  url: "/api/quizzes",
  model: QuizCzar.Models.Quiz,
  comparator: function(quiz){
    return -quiz.get("updated_at");
  },
  fetch: function(options){
    if (this.user) {
      options.data = options.data || {};
      options.data.user_id = this.user.id
    }
    Backbone.Collection.prototype.fetch.call(this, options);
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

QuizCzar.recentlyViewedQuizzes = new QuizCzar.Collections.Quizzes();
