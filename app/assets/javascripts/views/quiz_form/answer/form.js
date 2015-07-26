QuizCzar.Views.AnswerForm = Backbone.View.extend({
  initialize: function(options){
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
    this.currentlySaving = false;
  },
  tagName: "textarea",
  events: {
    "input" : "submit"
  },
  attributes: function(){
    return {
      "placeholder": (this.model.get("correct") ? "Correct Answer" : "Incorrect Answer")
    }
  },
  submit: function(){

    this.model.set({answer: this.$el.val()});

    if (this.currentlySaving) return;
    this._saving.saving();
    this.currentlySaving = true;
    this.saveNum = this.saveNum++;

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
              view._saving.saved();
            },
            error: handleError
          });
        }, 3000);
      }.bind(this);

      this.currentlySaving = false;
      this.model.save({},{
        success: function() {
          this._saving.saved();
        }.bind(this),
        error: handleError
      });

    }.bind(this), 1000);
  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
