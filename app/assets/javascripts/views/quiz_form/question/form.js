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
    this.currentlySaving = false;
    this.saveNum = 0;
  },
  submit: function(){
    this.model.set({question: this.$(".question-display").val() });
    //// Set not saved message on error

    if (this.currentlySaving) return;
    this._saving.saving();
    this.currentlySaving = true;
    this.saveNum = this.saveNum

    setTimeout( function() {

      var handleError = function(){
        if (currentNum < this.saveNum) {
          view._saving.saved();
          return;
        }
        view = this;
        setTimeout(function () {
          this.currentlySaving = false;
          view.model.save({},{
            success: function() {
              this.saveNum++;
              view._saving.saved();
            },
            error: handleError
          });
        }, 3000);
      }.bind(this);

      this.currentlySaving = false;
      this.model.save({},{
        success: function() {
          this.saveNum++;
          this._saving.saved();
        }.bind(this),
        error: handleError
      });

    }.bind(this), 1000);
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
