QuizCzar.Routers.Router = Backbone.Router.extend({
    initialize: function(options){
      this.$rootEl = options.$rootEl;
      this._model_leave_path = [];

      $("#root").on("click", "#model", this._dismiss_modal.bind(this));
      $("#root").on("click", ".quiz-play", this._dismiss_modal.bind(this));
    },
    routes: {
      "" : "root",
      "signUp" : "signUp",
      "users/:id" : "showUser",
      "quizzes" : "myQuizzes",
      "quizzes/:id/edit" : "editQuiz",
      "quizzes/:id/delete" : "deleteQuiz",
      "quizzes/:id/play" : "playQuiz",
      "quizzes/:quiz_id/grades" : "showGrade",
      "quizzes/new" : "newQuiz",
      "quizzes/search" : "searchQuizzes",
      "quizzes/:id" : "showQuiz",
      "logOut" : "logOut",
      "*notFound" : "searchQuizzes",
    },
    root: function(){
      var router = this;
      this.$rootEl.html("");
      this.$rootEl.find("#model").remove();
      this.redirectUnlessLoggedIn(function(){
        router.myQuizzes();
      });
    },
    redirectUnlessLoggedIn: function(callback){
      if (!QuizCzar.current_user.id) {
        this.logIn(callback);
      } else {
        callback();
      }
    },
    signUp:function(){
      var view = new QuizCzar.Views.UserNew();
      this._place_model(view);
    },
    logIn: function(callback){
      var view = new QuizCzar.Views.SignIn({callback: callback});
      this._place_model(view);
    },
    showUser: function(id){
      this.redirectUnlessLoggedIn(function(){
        var user = QuizCzar.recentlyViewedUsers.getOrFetch(id);
        var view = new QuizCzar.Views.UserShow({model: user});
        this._place_model(view.render());
      }.bind(this));
    },
    myQuizzes: function() {
      this.redirectUnlessLoggedIn(function(){
        QuizCzar.current_user.quizzes().fetch({reset: true});
        var view = new QuizCzar.Views.QuizIndex({
          viewOptions: {
            title: "My Quizzes",
            edit: true,
            delete: true
          },
          collection: QuizCzar.current_user.quizzes()
        });
        this._swap_views(view);
      }.bind(this));
    },
    searchQuizzes: function() {
      this.redirectUnlessLoggedIn(function(){
        var quizSearch = new QuizCzar.Collections.Quizzes();
        quizSearch.fetch();
        var view = new QuizCzar.Views.QuizSearch({collection: quizSearch});
        this._swap_views(view);
      }.bind(this));
    },
    showQuiz: function(id) {
      this.redirectUnlessLoggedIn(function(){
        var router = this;
        var quiz = QuizCzar.recentlyViewedQuizzes.getOrFetch(id);
        var view = new QuizCzar.Views.QuizShow({model: quiz});
        this._swap_views(view);
      }.bind(this));
    },
    newQuiz: function() {
      this.redirectUnlessLoggedIn(function(){
        var router = this;
        var quiz = new QuizCzar.Models.Quiz({})
        quiz.save({},{
          success: function() {
            var view = new QuizCzar.Views.QuizForm({model: quiz});
            router._swap_views(view);
          }
        })
      }.bind(this));
    },
    editQuiz: function(id) {
      this.redirectUnlessLoggedIn(function(){
        var router = this;
        var quiz = QuizCzar.current_user.quizzes().getOrFetch(id);

        quiz.fetch({
          success: function() {
            var view = new QuizCzar.Views.QuizForm({model: quiz});
            router._swap_views(view);
          }
        })
      }.bind(this));
    },
    deleteQuiz: function(id) {
      this.redirectUnlessLoggedIn(function(){

        quiz = QuizCzar.current_user.quizzes().getOrFetch(id)

        var deleteQuiz = function() {
          quiz.destroy({
            success: function(){
              Backbone.history.navigate("#",{trigger: true});
            }
          });
        };

        var cancel = function() {
          window.history.back();
        };

        var view = new QuizCzar.Views.Confirmation({
          title: ("Delete " + '"' + quiz.escape("name") + '"'),
          message: "Are you sure?",
          button_title: "Delete",
          confirm: deleteQuiz,
          leave: cancel
        })

        this._place_model(view);
      }.bind(this));
    },
    playQuiz: function(id) {
      this.redirectUnlessLoggedIn(function(){
        var router = this;
        QuizCzar.recentlyViewedQuizzes.getOrFetch(id,function(quiz){
          var view = new QuizCzar.Views.QuizPlay({model: quiz});
          router._place_model(view, {hideNav: true, background: "black"});
        });
      }.bind(this));
    },
    showGrade: function(quiz_id) {
      this.redirectUnlessLoggedIn(function(){
        this.showQuiz(quiz_id);
        var router = this;

        ////Check if grades are already loaded from quiz play
        if (QuizCzar.lastGrades) {
          var view = new QuizCzar.Views.GradeShow({
            collection: QuizCzar.lastGrades
          })
          this._place_model(view);
          QuizCzar.lastGrades = undefined;
        } else {
          QuizCzar.lastGrades = new QuizCzar.Collections.Grades({
            quiz: QuizCzar.recentlyViewedQuizzes.getOrFetch(quiz_id)
          })
          QuizCzar.lastGrades.fetch({
            success: function(){
              router.showGrade(quiz_id);
            }
          });
        }
      }.bind(this));
    },
    logOut: function(){
      $.ajax({
        url: "/api/session",
        method: "delete",
        success: function(data){
          QuizCzar.current_user.clear();
          Backbone.history.navigate("", {trigger: true});
        }
      });
    },
    _dismiss_modal: function(event) {
      if (event.currentTarget === event.target)
        this._modelView.exit();
    },
    _hide_nav: function() {
      this.$rootEl.addClass("cover-nav");
    },
    _show_nav: function() {
      this.$rootEl.removeClass("cover-nav");
    },
    _place_model: function(view) {
      var model = $('<div id="model">')
      model.append($('<div class="spacer">'));
      model.append(view.render().$el);
      model.append($('<div class="spacer">'));
      $("#root").append(model);
      this._modelView = view;
    },
    _swap_views: function(view, options) {
      if (this._modelView) {
        this._modelView.remove();
        $("#model").remove();
      }
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }
});
