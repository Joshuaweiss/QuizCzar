QuizCzar.Util = {};

QuizCzar.Util.flipEls = function(arr, i1, i2) {
  var swap = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = swap;
  return arr;
};


QuizCzar.Util.shuffle = function(array) {
  var output = array.slice();
  for (var i = 0; i < output.length; i++) {
    QuizCzar.Util.flipEls(output, i, _.random(i, output.length - 1));
  }
  return _(output);
};

QuizCzar.calculate_percentage = function(n, out_of) {
  if (n === 0) return 0;
  return Math.floor( ( n / out_of ) * 100 )
}

QuizCzar.makeAutoSave = function() {
  saveNum = 0;
  currentlySaving = false

  return function(model, options){

    if (currentlySaving) return;
    currentlySaving = true;
    currentNum = ++saveNum;
    if (options.saving) options.saving();

    setTimeout( function() {
      var handleError = function(){
        if (currentNum < saveNum) {
          console.log("saved let new take over");
          if (options.saved) options.saved();
          return;
        }
        setTimeout(function () {
          model.save({},{
            success: function() {
              console.log("saved after error");
              if (options.saved) options.saved();
            },
            error: handleError
          });
          currentlySaving = false;
        }, 2000);
      };

      currentlySaving = false;
      model.save({},{
        success: function() {
          console.log("saved no error");
          if (options.saved) options.saved();
        },
        error: handleError
      });

    }.bind(this), 1000);
  }
}
