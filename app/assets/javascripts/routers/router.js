QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
    },
    routes: {
      "" : "recentQuizzes",
      "quizzes/new" : "newQuiz",
      "quizzes/:id/edit" : "editQuiz",
      "quizzes/:id/delete" : "deleteQuiz",
      "quizzes/:id/play" : "playQuiz",
      "quizzes/:id" : "showQuiz"
    },
    recentQuizzes: function() {
      QuizCzar.myQuizzes.fetch();
      var view = new QuizCzar.Views.QuizIndex({collection: QuizCzar.myQuizzes});
      this._swap_views(view);
    },
    showQuiz: function(id) {
      var router = this;
      var quiz = QuizCzar.myQuizzes.getOrFetch(id);
      var view = new QuizCzar.Views.QuizShow({model: quiz});
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
    playQuiz: function(id) {
      var router = this;
      QuizCzar.myQuizzes.getOrFetch(id,function(quiz){
        var view = new QuizCzar.Views.QuizPlay({model: quiz});
        router._place_model(view);
      });
    },
    _place_model: function(view) {
      var model = $('<div id="model">')
      model.html(view.render().$el);
      $("#root").append(model);
      this._modelView = model;
    },
    _swap_views: function(view) {
      $('#model').remove();
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
