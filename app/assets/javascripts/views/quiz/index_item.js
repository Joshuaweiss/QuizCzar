QuizCzar.Views.QuizIndexItem = Backbone.View.extend({
  template: JST["quiz/index_item"],
  tagName: "tr",
  initialize: function(options){
    this.viewOptions = options.viewOptions || {};
    this.listenTo(this.model, "sync", this.render);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model, high_score: this.model.high_score, options: this.viewOptions}));
    return this;
  }
});
