QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["quiz_form/question/thumb"],
  tagName: "li",
  className: "question-thumb group",
  events: {
    "click .delete-question" : "delete"
  },
  initialize: function (options) {
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
  },
  delete: function(event) {
    event.preventDefault();

    this._saving.saving();

    var handleError = function(){
      setTimeout(function () {
        this.model.destroy({error: handleError});
      }, 500);
    }.bind(this);

    var success = function() {
      this._saving.saved();
      this.render();
    }.bind(this);

    this.model.destroy({
      success: success,
      error: handleError
    });
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    return this;
  }
})
