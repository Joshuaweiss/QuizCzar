QuizCzar.Views.QuizForm = Backbone.CompositeView.extend({
  template: JST["quiz/form"],
  tagName: "form",
  className: "quiz-form group",
  events: {
    "click .quiz-cards li" : "chooseQuestion"
  },
  initialize: function() {
    this.addSubview(".quiz-cards", new QuizCzar.Views.QuestionsIndex({collection: this.model.questions()}));
    if (this.model.questions().first()) {
      this.chooseQuestion({id: this.model.questions().first().id})
    }
  },
  chooseQuestion: function(event){
    var question;
    if(event.currentTarget) {
      question = this.model.questions().get($(event.currentTarget).data("id"));
    } else {
      question = this.model.questions().get(event.id);
    }

    this._questionView && this._questionView.remove()
    this._questionView = new QuizCzar.Views.QuestionForm({model: question});

    this.removeSubviews(".card-form");
    this.addSubview(".card-form", this._questionView);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    this.attachSubviews();
    return this;
  }
});
