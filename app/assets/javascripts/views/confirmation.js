QuizCzar.Views.Confirmation = Backbone.View.extend({
  template: JST["confirmation"],
  className: "confirmation-view",
  tagName: "section",
  initialize: function(options){
    this.title = options.title;
    this.message = options.message;
    this.confirm = options.confirm;
    this.leave = options.leave;
    this.button_title = options.button_title;
  },
  events: {
    "click button" : "confirmation"
  },
  confirmation: function(event){
    event.preventDefault;
    this.confirm();
  },
  exit: function(){
    this.leave();
  },
  render: function(){
    this.$el.html(this.template({
      title: this.title,
      message: this.message,
      button_title: this.button_title
    }));
    return this;
  }
});
