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
    this.autoSave = QuizCzar.makeAutoSave();
  },
  submit: function(){
    var view = this;
    view.model.set({question: view.$(".question-display").val() });
    view.autoSave(view.model,{
      saving: view._saving.saving.bind(view._saving),
      saved: view._saving.saved.bind(view._saving)
    })
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
