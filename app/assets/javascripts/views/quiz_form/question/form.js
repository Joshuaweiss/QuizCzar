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
  },
  submit: function(){
    this.model.set({question: this.$(".question-display").val() });
    //// Set not saved message on error

    if (this.currentlySaving) return;
    this._saving.saving();
    this.currentlySaving = true;

    setTimeout( function() {

      var handleError = function(){
        if (currentNum < this.saveNum) return;
        view = this;
        setTimeout(function () {
          view.model.save({},{
            success: function() {
              this.saveNum++;
              view._saving.saved();
              this.currentlySaving = false;
            },
            error: handleError
          });
        }, 3000);
      }.bind(this);

      this.model.save({},{
        success: function() {
          this._saving.saved();
          this.currentlySaving = false;
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
