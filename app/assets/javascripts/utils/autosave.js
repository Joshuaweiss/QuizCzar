(function(){

  var AutoSave = window.AutoSave = {};

  var mergeObjects = function(objectA, objectB){
    var out = {};
    for (var a in objectA) {
      out[a] = objectA[a];
    }
    for (var b in objectB) {
      out[b] = objectB[b];
    }
    return out;
  };


  var doNothing = function(){};

  var defaultOptions = {
    delayBeforeSaving: 1000,
    delayBeforeReTry: 1000,
    saving: doNothing,
    saved: doNothing,
    error: doNothing
  }


AutoSave.makeAutoSave = function(object, options) {
    var saveNum = 0;
    var waitingToSave = false
    var temp_default_options = mergeObjects(defaultOptions, options);

    return function autoSave(options){

      var options = mergeObjects(temp_default_options, options || {});

      if (waitingToSave) return;
      waitingToSave = true;
      currentNum = ++saveNum;
      options.saving(object, currentNum);

      var saved = function() {
        options.saved(object, currentNum);
      }

      ///wait until ready to save
      setTimeout( function() {

        ///on saving error
        var handleError = function(){
          options.error()
          setTimeout(function () {
            if (currentNum < saveNum) return;
            object.save({},{
              success: saved,
              error: handleError
            });
          }, options.delayBeforeReTry);
        };

        /// save
        waitingToSave = false;
        object.save({},{
          success: saved,
          error: handleError
        });

      }, options.delayBeforeSaving);
    }
  }


})();
