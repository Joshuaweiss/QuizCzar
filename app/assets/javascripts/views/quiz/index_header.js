QuizCzar.Views.QuizIndexHeader = Backbone.View.extend({
  initialize: function(options){
    this.options = options;
  },
  tagName: "tr",
  className: "quiz-index-headers",
  template: JST["quiz/index_headers"],
  render: function() {
    this.$el.html(this.template({options: this.options}))
    return this;
  }
});
