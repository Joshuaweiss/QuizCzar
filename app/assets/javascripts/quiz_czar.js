window.QuizCzar = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    $rootEl.empty();

    ///fetch feeds
    var navBar = new QuizCzar.Views.Navbar();
    $rootEl.append(navBar.render().$el);

    var contentView = $('<section id="content">');
    $rootEl.append(contentView);

    new QuizCzar.Routers.Router({$rootEl: contentView});
    Backbone.history.start();
  }
};
