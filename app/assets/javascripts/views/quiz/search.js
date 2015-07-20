QuizCzar.Views.QuizSearch = Backbone.CompositeView.extend({
  template: JST["quiz/search"],
  initialize: function() {
    this.addSubview( ".quiz-index-container",
      new QuizCzar.Views.QuizIndex({collection: this.collection})
    );
  },
  events: {
    "input .quiz-search" : "reload"
  },
  reload: function(){
    this.collection.fetch({
      data: {search_keywords: this.$(".quiz-search").val()}
    })
  },
  render: function(){
    this.$el.html(this.template({quizzes: this.collection}));
    this.attachSubviews();
    return this;
  }
});
