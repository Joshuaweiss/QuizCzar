QuizCzar.Views.AnswerForm = Backbone.View.extend({
  tagName: "textarea",
  className: "unstyled",
  events: {
    "input" : "submit"
  },
  submit: function(){
    this.model.set({answer: this.$el.val()});
    ////error if not saved
    this.model.save();
  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
