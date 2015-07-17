QuizCzar.Views.AnswerFormsIndex = Backbone.CompositeView.extend({
  initialize: function() {
    var answers = this.collection;
    answers.each(function(answer){
      this.addSubview("", new QuizCzar.Views.AnswerForm({model: answer}));
    }.bind(this));
  },

  className: "group",
  render: function() {
    this.attachSubviews();
  }
})
