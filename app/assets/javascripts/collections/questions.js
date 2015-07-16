QuizCzar.Collections.Questions = Backbone.Collection.extend({
  url: "/api/questions",
  initialize: function(options){
    if (options && options.quiz){
      this.quiz = options.quiz
    }
  },
  model: QuizCzar.Models.Question
});
