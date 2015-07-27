QuizCzar.Views.SignIn = Backbone.View.extend({
  initialize: function(options){
    this.callback = options.callback;
  },
  template: JST["session/sign_in"],
  events: {
    "click .sign-in-button" : "signIn",
    "click .guest-sign-in-button" : "guestSignIn",
    "click .sign-up-button" : "signUp"
  },
  tagName: "section",
  className: "sign-in-page group",
  signIn: function(){
    $.ajax({
      url: "/api/session",
      method: "post",
      data: this.$(".sign-in-info").serializeJSON(),
      success: function(data){
        QuizCzar.current_user.set(data);
        if (QuizCzar.current_user.id) {
          this.$el.remove();
          this.callback();
        }
      }.bind(this),
      error: function(data){
        this.$(".errors").html("Invalid Credentials");
      }.bind(this)
    });
  },
  guestSignIn: function(){
    $.ajax({
      url: "/api/session/guest",
      method: "post",
      success: function(data){
        QuizCzar.current_user.set(data);
        this.$el.remove();
        this.callback();
      }.bind(this)
    });
  },
  signUp: function(){
    Backbone.history.navigate("signUp",{trigger: true});
  },
  exit: function(){
  },
  render: function(){
    this.$el.html(this.template({errors: this.errors}));
    return this;
  }
});
