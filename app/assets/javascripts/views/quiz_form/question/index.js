QuizCzar.Views.QuestionsThumbIndex = Backbone.CompositeView.extend({
  tagName: "ul",
  className: "question-thumbs",
  events: {
    "click .add-question-button" : "addQuestion"
  },
  initialize: function(options) {
    this._saving = options._saving;
    this.listenTo(this.collection, "remove", this.render);
  },
  addQuestion: function(event){
    var questions = this.collection;
    var view = this;

    event.preventDefault;
    var question = new QuizCzar.Models.Question({
      quiz_id: this.collection.quiz.id,
      question: "Default Question"
    });

    this._saving.saving();

    var handleError = function(){
      setTimeout(function () {
        this.model.save({error: handleError});
      }, 500);
    }.bind(this)

    question.save({},{
      success: function() {
        this._saving.saved();
        questions.add(question);
        view.render();
      }.bind(this),
      error: handleError
    });
  },
  render: function(){
    var ul = this.$el;
    ul.empty();

    var addButton = $('<li class="add-question-button">Add a Question</li>');
    ul.append(addButton);

    this.collection.each(function(question) {
      var subview = new QuizCzar.Views.QuestionThumb({
        model: question,
        _saving: this._saving
      });
      ul.append(subview.render().$el);
    }.bind(this));

    return this;
  }
})
