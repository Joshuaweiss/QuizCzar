QuizCzar.Views.QuizSaving = Backbone.View.extend({
  initialize: function(){
    this._className = "saved-notification";
    this._waitToSave = 0;
    this.render();
  },
  className: function(){
    return this._className;
  },
  saved: function(){
    if (this._waitToSave > 0) this._waitToSave--;
    if (this._waitToSave === 0) {
      this._className = "saved-notification";
      this.render();
    }
  },
  saving: function(){
    this._className = "saving-notification";
    this._waitToSave++;
    this.render();
  },
  text: function() {
    if (this._className === "saved-notification") return "Saved"
    return "Saving..."
  },
  render: function(){
    this.$el.html(this.text()).removeClass().addClass(this.className());
    return this;
  }
});
