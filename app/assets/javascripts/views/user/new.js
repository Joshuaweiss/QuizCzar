QuizCzar.Views.UserNew = Backbone.View.extend({
  template: JST["user/new"],
  className: "sign-up-page",
  tagName: "section",
  events: {
    "submit .sign-up-form" : "logIn"
  },
  exit: function(){
    $("#root #model").remove();
    window.history.back();
  },
  logIn: function(event){
    event.preventDefault();
    var data = this.$(".sign-up-form").serializeJSON();
    $.ajax({
      url: "/api/users",
      method: "post",
      data: data,
      success: function(data){
        $("#root #model").remove();
        QuizCzar.current_user.set(data);
        Backbone.history.navigate("", {trigger: true});
      },
      error: function(data){
        this.$(".errors").empty();
        data.responseJSON.forEach(function(error){
          this.$(".errors").append($("<li>"+error+"</li>"));
        });
      }.bind(this)
    });
  },
  render: function(){
    this.$el.html(this.template({}));
    return this;
  }
});
