QuizCzar.Views.QuestionsIndex = Backbone.CompositeView.extend({
  tagName: "ul",
  render: function(){
    var ul = this.$el;
    ul.empty();
    this.collection.each(function(question) {
      ul.append(new QuizCzar.Views.QuestionThumb({model: question}));
    });
  }
})
