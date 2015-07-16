QuizCzar.Views.QuestionForm = Backbone.CompositeView.extend({
  template: JST["question/form"],
  tagName: "form",
  className: "question-form",
  events: {
    "input .question-display" : "submit"
  },
  initialize: function() {
    var answers = this.model.answers();
    answers.each(function(answer) {
      var answerView = new QuizCzar.Views.AnswerForm({model: answer});
      answerView.render();
      this.addSubview(".answers", answerView);
    }.bind(this));

    while (this.subviews(".answers").size() < 4) {
      var answerView = new QuizCzar.Views.AnswerForm({model: new QuizCzar.Models.Answer()});
      answerView.render();
      this.addSubview(".answers", answerView);
    }
  },
  submit(){
    this.model.set({name: this.$(".question-display").val() })
    //// Set not saved message on error
    this.model.save({},{});
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
