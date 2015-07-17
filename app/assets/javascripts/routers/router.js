QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
    },
    routes: {
      "" : "recentQuizzes",
      "quizzes/new" : "newQuiz",
      "quizzes/:id/edit" : "editQuiz",
      "quizzes/:id/delete" : "deleteQuiz"
    },
    recentQuizzes: function() {
      QuizCzar.myQuizzes.fetch();
      var view = new QuizCzar.Views.QuizIndex({collection: QuizCzar.myQuizzes});
      this._swap_views(view);
    },
    newQuiz: function() {
      var router = this;
      var quiz = new QuizCzar.Models.Quiz({})

      quiz.save({},{
        success: function() {
          var view = new QuizCzar.Views.QuizForm({model: quiz});
          router._swap_views(view);
        }
      })
    },
    editQuiz: function(id) {
      var router = this;
      var quiz = QuizCzar.myQuizzes.getOrFetch(id);

      quiz.fetch({
        success: function() {
          var view = new QuizCzar.Views.QuizForm({model: quiz});
          router._swap_views(view);
        }
      })
    },
    deleteQuiz: function(id) {
      var quiz = new QuizCzar.Models.Quiz({id: id})
      quiz.destroy({
        success: function(){
          Backbone.history.navigate("#",{trigger: true});
        }
      })
    },
    _swap_views: function(view) {
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
