QuizCzar.Views.GradeShow = Backbone.CompositeView.extend({
  template: JST["grade/show"],
  className:"grade-show",
  initialize: function(){
    this.addSubview(
      ".past-grades",
      new QuizCzar.Views.GradeIndex({
        collection: this.collection
      })
    )
    this.model = this.collection.last();
  },
  render: function(){
    this.$el.html(this.template({grade: this.model}));
    this.attachSubviews()
    return this;
  }
});
