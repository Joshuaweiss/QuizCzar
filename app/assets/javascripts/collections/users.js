QuizCzar.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: QuizCzar.Models.User
});

QuizCzar.recentlyViewedUsers = new QuizCzar.Collections.Users();
