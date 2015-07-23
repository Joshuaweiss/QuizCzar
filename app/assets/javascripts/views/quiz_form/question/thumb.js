QuizCzar.Views.QuestionThumb = Backbone.View.extend({
  template: JST["quiz_form/question/thumb"],
  tagName: "li",
  className: "question-thumb group",
  events: {
    "click .delete-question" : "delete"
  },
  attributes: function(){
    return {
      "data-id": this.model.id
    }
  },
  initialize: function (options) {
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
    this._quizShow = options._quizShow;
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
      this._quizShow.chooseLastQuestion();
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
