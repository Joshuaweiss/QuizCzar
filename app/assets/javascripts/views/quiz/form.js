QuizCzar.Views.QuizForm = Backbone.CompositeView.extend({
  template: JST["quiz/form"],
  tagName: "form",
  events: {
    "click .quiz-cards li" : "chooseQuestion"
  },
  initialize: function() {
    this.addSubview(".quiz-cards", new QuizCzar.Views.QuestionsIndex({collection: this.model.questions()}));
  },
  chooseQuestion: function(event){
    var question = this.model.questions().get($(event.currentTarget).data("id"));

    this._questionView && this._questionView.remove()
    this._questionView = new QuizCzar.Views.QuestionForm({model: question});
    this.$(".card-form").html(this._questionView.render().$el);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    this.attachSubviews();
    return this;
  }
});
