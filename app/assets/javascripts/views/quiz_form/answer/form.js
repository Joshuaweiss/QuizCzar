QuizCzar.Views.AnswerForm = Backbone.View.extend({
  initialize: function(options){
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
    this.autoSave = window.AutoSave.makeAutoSave(this.model,{
      saving: this._saving.saving.bind(this._saving),
      saved: this._saving.saved.bind(this._saving)
    });
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
    var view = this;
    view.model.set({answer: view.$el.val()});
    view.autoSave();
  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
