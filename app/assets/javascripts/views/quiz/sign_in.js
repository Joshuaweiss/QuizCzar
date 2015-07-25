QuizCzar.Views.SignIn = Backbone.View.extend({
  template: JST["session/sign_in"],
  tagName: "section",
  className: "sign-in group",
  exit: function(){

  },
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});
