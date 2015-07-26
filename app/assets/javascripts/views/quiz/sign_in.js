QuizCzar.Views.SignIn = Backbone.View.extend({
  initialize: function(options){
    this.callback = options.callback;
    this.errors = [];
  },
  template: JST["session/sign_in"],
  events: {
    "click .sign-in-button" : "signIn"
  },
  tagName: "section",
  className: "sign-in group",
  signIn: function(){
    $.ajax({
      url: "/api/session",
      method: "post",
      data: this.$(".sign-in-info").serializeJSON(),
      success: function(data){
        QuizCzar.current_user.set(data);
        if (QuizCzar.current_user.id) {
          this.errors = [];
          this.$el.remove();
          this.callback();
        }
      },
      error: function(data){
        this.errors = ["Invalid Credentials"];
        this.render();
      }.bind(this)
    });
  },
  exit: function(){
  },
  render: function(){
    this.$el.html(this.template({errors: this.errors}));
    return this;
  }
});
