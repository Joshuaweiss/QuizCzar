QuizCzar.Views.QuizForm = Backbone.CompositeView.extend({
  template: JST["quiz_form/form"],
  tagName: "form",
  className: "quiz-form group",
  events: {
    "click .quiz-cards .question-thumb a" : "chooseQuestion",
    "input .quiz-name-edit" : "changeName"
  },
  initialize: function() {
    this.addSubview(".quiz-cards", new QuizCzar.Views.QuestionsThumbIndex({collection: this.model.questions()}));
    if (this.model.questions().first()) {
      this.chooseQuestion({id: this.model.questions().first().id})
    }
  },
  changeName: function() {
    this.model.set({name: this.$(".quiz-name-edit").val()});
    this.model.save();
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