QuizCzar.Views.QuestionForm = Backbone.CompositeView.extend({
  template: JST["question/form"],
  tagName: "section",
  className: "question-form",
  events: {
    "input .question-display" : "submit"
  },
  initialize: function() {
    this.addSubview(".answers", new QuizCzar.Views.AnswerFormsIndex({collection: this.model.answers()}));
  },
  submit: function(){
    this.model.set({question: this.$(".question-display").val() });
    //// Set not saved message on error
    this.model.save();
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
