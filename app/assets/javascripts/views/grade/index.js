QuizCzar.Views.GradeIndex = Backbone.View.extend({
  template: JST["grade/index"],
  render: function(){
    this.$el.html(this.template({collection: this.collection}));
    return this;
  }
});
