QuizCzar.Views.QuizIndexItem = Backbone.View.extend({
  template: JST["quiz/table_item"],
  tagName: "tr",
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    return this;
  }
});
