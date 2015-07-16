QuizCzar.Models.Answer = Backbone.Model.extend({
  urlRoot: "/api/answers",
  toJSON: function() {
    return {answer: _.clone(this.attributes)};
  }
});
