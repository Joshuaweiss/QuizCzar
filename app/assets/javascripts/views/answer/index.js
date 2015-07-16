QuizCzar.Views.AnswerFormsIndex = Backbone.CompositeView.extend({
  initialize: function() {
    var view = this;
    var answers = this.collection;

    while (answers.size() < 4) {
      answers.add(new QuizCzar.Models.Answer({
        question_id: this.collection.question.id,
        correct: (answers.size() === 0)
      }));
    }

    answers.each(function(answer){
      view.addSubview("ul", new QuizCzar.Views.AnswerForm({model: answer}));
    })

  },
  render: function() {
    this.$el.html($("<ul>"));
    this.attachSubviews();
  }
})
