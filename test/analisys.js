vows = require('vows');
assert = require('assert');

Tonality = require('../');

vows.describe('Chord analisys').addBatch({
  "major": {
    topic: new Tonality('g', 'major'),

    "just friends": function(tonality) {
    }
  }
}).export(module);
