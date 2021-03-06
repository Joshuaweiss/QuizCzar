QuizCzar.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user/show"],
  className: "user-show",
  tagName: "section",
  events:  {
    "change .picture-input" : "uploadFile"
  },
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.addSubview(".user-show-quizzes",
      new QuizCzar.Views.QuizIndex({
        collection: this.model.quizzes(),
        viewOptions: {
          hideTitle: true
        }
      })
    )
  },
  uploadFile: function(event){
    var formData = new FormData();
    formData.append("user[picture]", event.target.files[0]);

    var spinner = new QuizCzar.Spinner();
    spinner.place();
    $.ajax({
      url: "/api/users/" + this.model.id,
      method: "put",
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        this.model.set(data, {parse: true});
        this.model.trigger("sync");
        this.render();
      }.bind(this),
      complete: function(){
        spinner.remove();
      }
    });
  },
  exit: function(){
    window.history.back();
  },
  render: function(){
    this.$el.html(this.template({
      user: this.model,
      current_user: this.model.id === QuizCzar.current_user.id
    }));
    this.attachSubviews();
    return this;
  }
});
