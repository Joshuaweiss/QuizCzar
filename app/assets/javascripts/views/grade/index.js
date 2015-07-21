QuizCzar.Views.GradeIndex = Backbone.View.extend({
  template: JST["grade/index"],
  initialize: function(){
    this.render();
  },
  render: function(){
    grades = this.collection.map(function(grade){
              return QuizCzar.calculate_percentage(
                parseInt(grade.get("correct_answers")),
                parseInt(grade.get("number_of_questions"))
              )
              });

    dates = this.collection.map(function(grade){
                return jQuery.format.prettyDate(Date.parse(grade.escape("created_at")));
              });

    var data = {
      labels: dates,
      datasets:[
        {
          label: "Grades",
          fillColor: "rgba(105, 255, 0, 0.2)",
          strokeColor: "rgba(74, 255, 0, 1)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "#6dff1f",
          pointHighlightFill: "rgba(74, 255, 0, 1)",
          pointHighlightStroke: "rgba(89, 255, 0, 1)",
          data: grades
        }
      ]
    }

    this.$el.html(this.template({data: data}));


    return this;
  }
});
