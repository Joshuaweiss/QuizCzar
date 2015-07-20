QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
    },
    routes: {
      "" : "recentQuizzes",
      "quizzes/new" : "newQuiz"
    },
    recentQuizzes: function() {
      QuizCzar.recentlyViewedQuizzes.fetch();
      var view = new QuizCzar.Views.QuizIndex({collection: QuizCzar.recentlyViewedQuizzes});
      this._swap_views(view);
    },
    newQuiz: function() {
      // var quiz = new QuizCzar.Models.Quiz();
      var router = this;
      var quiz = new QuizCzar.Models.Quiz({id: 1})

      quiz.fetch({
        success: function() {
          var view = new QuizCzar.Views.QuizForm({model: quiz});
          router._swap_views(view);
        }
      })

    },
    _swap_views: function(view) {
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
