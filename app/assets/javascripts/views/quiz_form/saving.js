QuizCzar.Views.QuizSaving = Backbone.View.extend({
  initialize: function(){
    this._className = "saved-notification";
    this.objectsSaving = {};
    this.render();
  },
  className: function(){
    return this._className;
  },
  saved: function(object, save_id){
    delete this.objectsSaving[object.uid];
    if (Object.keys(this.objectsSaving).length === 0) {
      this._className = "saved-notification";
      this.render();
    }
  },
  saving: function(object, save_id){
    this.objectsSaving[object.uid] = true;
    this._className = "saving-notification";
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
