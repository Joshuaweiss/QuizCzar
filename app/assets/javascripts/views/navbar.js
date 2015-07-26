QuizCzar.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],
  tagName: "nav",
  id: "navbar",
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(QuizCzar.current_user, "sync change:picture_url", this.render);
  },
  events: {
    "click .signout" : "logout",
    "click .log-out" : "logOut"
  },
  logOut: function(){
    Backbone.history.navigate("logOut",{trigger: true});
  },
  render: function(){
    this.$el.html(this.template({user: this.model}));

    var buttonTemplate = _.template($("#signout-button").html());
    this.$(".signout").html(buttonTemplate());

    return this;
  }
});
