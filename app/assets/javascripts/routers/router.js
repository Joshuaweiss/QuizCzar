QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
    },
    routes: {
      "" : "recentQuizzes",
      "quizzes/new" : "newQuiz"
    },
    recentQuizzes: function() {

    },
    newQuiz: function() {
      var quiz = new QuizCzar.Models.Quiz();
      var view = new QuizCzar.Views.QuizForm({model: quiz});
      this._swap_views(view);
    },
    _swap_views: function(view) {
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
