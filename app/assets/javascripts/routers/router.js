QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
      this._model_leave_path = [];

      $("#root").on("click", "#model", this._dismiss_modal.bind(this));
    },
    routes: {
      "" : "recentQuizzes",
      "quizzes/:id/edit" : "editQuiz",
      "quizzes/:id/delete" : "deleteQuiz",
      "quizzes/:id/play" : "playQuiz",
      "quizzes/:quiz_id/grades" : "showGrade",
      "quizzes/new" : "newQuiz",
      "quizzes/search" : "searchQuizzes",
      "quizzes/:id" : "showQuiz"
    },
    recentQuizzes: function() {
      QuizCzar.myQuizzes.fetch();
      var view = new QuizCzar.Views.QuizIndex({collection: QuizCzar.myQuizzes});
      this._swap_views(view);
    },
    searchQuizzes: function() {
      QuizCzar.myQuizzes.fetch();
      var view = new QuizCzar.Views.QuizSearch({collection: QuizCzar.myQuizzes});
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
        router._swap_views(view, {hideNav: true, background: "black"});
      });
    },
    showGrade: function(quiz_id) {
      this.showQuiz(quiz_id);
      var router = this;

      ////Check if grades are already loaded from quiz play
      if (QuizCzar.lastGrades) {
        var view = new QuizCzar.Views.GradeShow({
          collection: QuizCzar.lastGrades
        })
        this._place_model(view, "#quizzes/" + quiz_id);
        QuizCzar.lastGrades = undefined;
      } else {
        QuizCzar.lastGrades = new QuizCzar.Collections.Grades({
          quiz: QuizCzar.myQuizzes.getOrFetch(quiz_id)
        })
        QuizCzar.lastGrades.fetch({
          success: function(){
            router.showGrade(quiz_id);
          }
        });
      }
    },
    _dismiss_modal: function(event) {
      if (event.currentTarget === event.target)
        Backbone.history.navigate(this._model_leave_path.pop(), {trigger: true});
    },
    _hide_nav: function() {
      this.$rootEl.addClass("cover-nav");
    },
    _show_nav: function() {
      this.$rootEl.removeClass("cover-nav");
    },
    _place_model: function(view, leave_path) {
      var model = $('<div id="model">')
      model.html(view.render().$el);
      $("#root").append(model);
      this._model_leave_path.push(leave_path)
      this._modelView = model;
    },
    _swap_views: function(view, options) {
      $('#model').remove();

      if (options && options.hideNav) {
        this._hide_nav();
      } else {
        this._show_nav();
      }

      if (options && options.background === "black") {
        $("body").addClass("black");
        this.$rootEl.addClass("black");
      } else {
        $("body").removeClass("black");
        this.$rootEl.removeClass("black");
      }

      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
