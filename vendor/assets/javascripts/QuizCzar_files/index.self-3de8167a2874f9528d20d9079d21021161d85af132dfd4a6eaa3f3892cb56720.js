QuizCzar.Views.QuestionsThumbIndex = Backbone.CompositeView.extend({
  tagName: "ul",
  className: "question-thumbs",
  render: function(){
    var ul = this.$el;
    ul.empty();
    this.collection.each(function(question) {
      var subview = new QuizCzar.Views.QuestionThumb({model: question});
      ul.append(subview.render().$el);
    });

    return this;
  }
})