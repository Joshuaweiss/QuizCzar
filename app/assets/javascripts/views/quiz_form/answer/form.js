QuizCzar.Views.AnswerForm = Backbone.View.extend({
  initialize: function(options){
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
    this.currentlySaving = false;
  },
  tagName: "textarea",
  className: "unstyled",
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
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
