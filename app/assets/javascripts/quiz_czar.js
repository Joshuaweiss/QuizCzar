window.QuizCzar = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    $rootEl.empty();

    $.ajax({
      url: "/api/session",
      success: function(data){

        QuizCzar.current_user = new QuizCzar.Models.User();
        QuizCzar.recentlyViewedUsers.add(QuizCzar.current_user);
        QuizCzar.current_user.set(QuizCzar.current_user.parse(data));
        QuizCzar.recentlyViewedQuizzes.add(QuizCzar.current_user.quizzes());

        ///fetch feeds
        var navBar = new QuizCzar.Views.Navbar({model: QuizCzar.current_user});
        $rootEl.append(navBar.render().$el);


        var contentView = $('<section id="content">');
        $rootEl.append(contentView);

        new QuizCzar.Routers.Router({$rootEl: contentView});
        Backbone.history.start();

      }
    })
  }
};
