QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["question/thumb"],
  tagName: "li",
  className: "question-thumb",
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  attributes: function(){
    return {
      'data-id': this.model.id
    };
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
})
