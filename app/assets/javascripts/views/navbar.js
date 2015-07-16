QuizCzar.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],
  tagName: "nav",
  id: "navbar",
  events: {
    "click .signout" : "logout"
  },
  logout: function(){
    window.location.href = "/signout"
  },
  render: function(){
    this.$el.html(this.template());

    var buttonTemplate = _.template($("#signout-button").html());
    this.$el.find(".signout").html(buttonTemplate());

    return this;
  }
});
