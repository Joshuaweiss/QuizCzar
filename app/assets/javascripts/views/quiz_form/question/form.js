QuizCzar.Views.QuestionForm = Backbone.CompositeView.extend({
  template: JST["quiz_form/question/form"],
  tagName: "section",
  className: "question-form",
  events: {
    "input .question-display" : "submit"
  },
  initialize: function(options) {
    this._saving = options._saving;
    this.addSubview(".answers", new QuizCzar.Views.AnswerFormsIndex({
      collection: this.model.answers(),
      _saving: this._saving
    }));
  },
  submit: function(){
    this.model.set({question: this.$(".question-display").val() });
    //// Set not saved message on error

    this._saving.saving();

    var handleError = function(){
      setTimeout(function () {
        if (this.model)
          this.model.save({error: handleError});
      }, 500);
    }.bind(this)

    this.model.save({},{
      success: function() {
        this._saving.saved();
      }.bind(this),
      error: handleError
    });
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
