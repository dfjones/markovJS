if (require) {
  var _ = require("underscore");
}

var Markov = function (params) {
  this.params = params || {} ;
  // Make sure we have a defaul chain length
  this.params.chainLength = this.params.chainLength || 3;
  this.stateTable = {},
  this.lastGen = [];
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
      var key = _.first(tuple, tuple.length-1);
      var val = _.last(tuple);
      this.tableInsert(key, val);
    }
  },

  generate: function (length) {

  },

  generateNext: function () {
    var next = null;

    next = this.randomChoice(this.tableLookup(this.lastGen));

    if (this.lastGen.length >= (this.params.chainLength-1)) {
      this.lastGen = _.rest(this.lastGen);
    }

    this.lastGen.push(next);

    return next;
  },

  tableLookup: function (key) {
    var t = this.stateTable;
    for (var i = 0; i < key.length; ++i) {
      t = t[key[i]];
    }

    if (!_.isArray(t)) {
      t = _.keys(t);
    }

    return t;
  },

  tableInsert: function (key, val) {
    var t = this.stateTable;
    for (var i = 0; i < key.length; ++i) {
      if (t.hasOwnProperty(key[i])) {
        t = t[key[i]];
      }
      else {
        t = t[key[i]] = (i === key.length-1) ? [] : {};
      }
    }

    t.push(val);
  },

  randomChoice: function (list) {
    var i = Math.round(Math.random() * (list.length-1));
    return list[i];
  }
  
};

if (exports) {
  exports.Markov = Markov;
}
