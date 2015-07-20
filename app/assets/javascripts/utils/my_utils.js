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
