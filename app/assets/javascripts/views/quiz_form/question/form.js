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

    this.autoSave = window.AutoSave.makeAutoSave(this.model,{
      saving: this._saving.saving.bind(this._saving),
      saved: this._saving.saved.bind(this._saving)
    });
  },
  submit: function(){
    var view = this;
    view.model.set({question: view.$(".question-display").val() });
    view.autoSave();
  },
  render: function() {
    this.$el.html(this.template({question: this.model}));
    this.attachSubviews();
    return this;
  }
});
