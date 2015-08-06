QuizCzar.Views.AnswerForm = Backbone.View.extend({
  initialize: function(options){
    this._saving = options._saving;
    this.listenTo(this.model, "sync", this.render);
    this.autoSave = QuizCzar.makeAutoSave();
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
    view.autoSave(view.model,{
      saving: view._saving.saving.bind(view._saving),
      saved: view._saving.saved.bind(view._saving)
    })

  },
  render: function() {
    this.$el.html(this.model.escape("answer"));
    return this;
  }
});
