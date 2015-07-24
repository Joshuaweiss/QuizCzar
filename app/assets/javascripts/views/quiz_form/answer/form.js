QuizCzar.Views.AnswerForm = Backbone.View.extend({
  initialize: function(options){
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
  },
  tagName: "textarea",
  className: "unstyled",
  events: {
    "input" : "submit"
  },
  submit: function(){

    this.model.set({answer: this.$el.val()});
    this._saving.saving();

    var handleError = function(){
      view = this;
      setTimeout(function () {
        view.model.save({},{
          success: function() {
            view._saving.saved();
          },
          error: handleError
        });
      }, 3000);
    }.bind(this);

    this.model.save({},{
      success: function() {
        this._saving.saved();
      }.bind(this),
      error: handleError
    });
  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
