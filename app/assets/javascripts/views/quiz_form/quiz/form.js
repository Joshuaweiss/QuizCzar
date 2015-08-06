QuizCzar.Views.QuizForm = Backbone.CompositeView.extend({
  template: JST["quiz_form/form"],
  tagName: "form",
  className: "quiz-form group",
  events: {
    "click .quiz-cards .question-thumb" : "chooseQuestion",
    "input .quiz-name-edit" : "changeName"
  },
  initialize: function() {
    this._saving = new QuizCzar.Views.QuizSaving();
    this.addSubview(".save-message", this._saving);

    this.addSubview(".quiz-cards", new QuizCzar.Views.QuestionsThumbIndex({
      collection: this.model.questions(),
      _saving: this._saving,
      _quizShow: this
    }));

    this.autoSave = QuizCzar.makeAutoSave();

    if (this.model.questions().first()) {
      this.chooseQuestion({id: this.model.questions().first().id})
    }
  },
  changeName: function() {
    var view = this;
    view.model.set({name: this.$(".quiz-name-edit").val()});
    view.autoSave(view.model,{
      saving: view._saving.saving.bind(view._saving),
      saved: view._saving.saved.bind(view._saving)
    })
  },
  chooseQuestion: function(event){
    var question;
    if(event.currentTarget) {
      question = this.model.questions().get($(event.currentTarget).data("id"));
    } else {
      question = this.model.questions().get(event.id);
    }

    this._questionView && this._questionView.remove()
    this._questionView = new QuizCzar.Views.QuestionForm({
      model: question,
      _saving: this._saving
    });

    this.removeSubviews(".card-form");
    this.addSubview(".card-form", this._questionView);
  },
  chooseLastQuestion: function(){

    var question = this.model.questions().last()

    this._questionView && this._questionView.remove()
    this._questionView = new QuizCzar.Views.QuestionForm({
      model: question,
      _saving: this._saving
    });

    this.removeSubviews(".card-form");
    this.addSubview(".card-form", this._questionView);
  },
  render: function() {
    this.$el.html(this.template({quiz: this.model}));
    this.attachSubviews();
    return this;
  }
});
