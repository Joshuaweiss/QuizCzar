QuizCzar.Views.QuestionsThumbIndex = Backbone.CompositeView.extend({
  tagName: "ul",
  className: "question-thumbs",
  events: {
    "click .add-question-button" : "addQuestion"
  },
  initialize: function() {
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
    question.save({},{
      success: function() {
        questions.add(question);
        view.render();
      }
    });
  },
  render: function(){
    var ul = this.$el;
    ul.empty();

    var addButton = $('<li class="add-question-button">+ Add a Question</li>');
    ul.append(addButton);

    this.collection.each(function(question) {
      var subview = new QuizCzar.Views.QuestionThumb({model: question});
      ul.append(subview.render().$el);
    });

    return this;
  }
})
