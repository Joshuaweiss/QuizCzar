QuizCzar.Models.Quiz = Backbone.Model.extend({
  urlRoot: "/api/quizzes",
  parse: function(data) {
    var questionArray = this.questions();
    if (data.questions) {
      data.questions.forEach(function(questionData){
        questionArray.push( new QuizCzar.Models.Question(questionData) )
      })
    }
  },
  questions: function() {
    return this._questions = this._questions || _([]);
  }
});
