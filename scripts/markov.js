var Markov = function (params) {
  this.params = params || {} ;
  // Make sure we have a defaul chain length
  this.params.chainLength = this.params.chainLength || 3;
  this.stateTable = {}
};

Markov.prototype = {

  createTuples: function (tokens) {
    var cl = this.params.chainLength;
    var tuples = [];
    for (var i = 0; i < (tokens.length - (cl-1)); ++i) {
      var tuple = [];
      for (var j = 0; j < cl; ++j) {
        tuple.push(tokens[i+j]);
      }
      tuples.push(tuple);
    }

    return tuples;
  },

  buildState: function (tokens) {
    var tuples = this.createTuples(tokens);

    for (var i = 0; i < tuples.length; ++i) {
      var tuple = tuples[i];
      var table = this.stateTable;
      var j;
      for (j = 0; j < (tuple.length-1); ++j) {
        var t = tuple[j];
        if (table.hasOwnProperty(t)) {
          table = table[t];
        }
        else {
          table[t] = (j === tuple.length - 2) ? [] : {};
          table = table[t];
        }
      }
      table.push(tuple[j]);
    }
  }
  
};

if (exports) {
  exports.Markov = Markov;
}
