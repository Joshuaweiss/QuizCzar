QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["question/thumb"],
  tagName: "li",
  className: "question-thumb group",
  events: {
    "click .delete-question" : "delete"
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  delete: function(event) {
    event.preventDefault();
    this.model.destroy();
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
})
