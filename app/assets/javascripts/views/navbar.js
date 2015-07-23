QuizCzar.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],
  tagName: "nav",
  id: "navbar",
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(QuizCzar.current_user, "sync change:picture_url", this.render);

    console.log(this.model.cid + "SIDE BAR");
  },
  events: {
    "click .signout" : "logout"
  },
  logout: function(){
    window.location.href = "/signout"
  },
  render: function(){
    this.$el.html(this.template({user: this.model}));

    var buttonTemplate = _.template($("#signout-button").html());
    this.$(".signout").html(buttonTemplate());

    return this;
  }
});
