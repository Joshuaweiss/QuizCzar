QuizCzar.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: QuizCzar.Models.User,
  getOrFetch: function(id, callback){
    var users = this;
    var user = users.get(id);
    if (user) {
      user.fetch({
        success: function(){
          users.add(user);
          if (callback) callback(quiz);
        }
      });
    } else {
      user = new QuizCzar.Models.User({id: id});
      user.fetch({
        success: function(){
          users.add(user);
          if (callback) callback(quiz);
        }
      });
    }

    return user;
  }
});

QuizCzar.recentlyViewedUsers = new QuizCzar.Collections.Users();
