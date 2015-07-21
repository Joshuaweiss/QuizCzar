QuizCzar.Views.AnswerFormsIndex = Backbone.CompositeView.extend({
  initialize: function(options) {
    this._saving = options._saving;
    var answers = this.collection;
    answers.each(function(answer){
      this.addSubview("", new QuizCzar.Views.AnswerForm({
        model: answer,
        _saving: this._saving
      }));
    }.bind(this));
  },

  className: "group",
  render: function() {
    this.attachSubviews();
    return this;
  }
})
