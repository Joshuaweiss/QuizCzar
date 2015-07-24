QuizCzar.Spinner = Backbone.View.extend({
  place: function(){
    $("#root").append($('<div id="spinner">'));
  },
  remove: function(){
    $("#spinner").remove();
  }
})
