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
