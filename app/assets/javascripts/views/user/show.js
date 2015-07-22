QuizCzar.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user/show"],
  className: "user-show",
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.addSubview(".user-show-quizzes",
      new QuizCzar.Views.QuizIndex({
        collection: this.model.quizzes(),
        viewOptions: {
          title: "Quizzes"
        }
      })
    )
  },
  exit: function(){
    window.history.back();
  },
  render: function(){
    this.$el.html(this.template({user: this.model}));
    this.attachSubviews();
    return this;
  }
});
