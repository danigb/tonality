vows = require('vows');
assert = require('assert');

Tonality = require('../');

vows.describe('Tonality scales').addBatch({
  "major scales": {
    topic: new Tonality('a', 'major'),

    "first grade": function(tonality) {
      assert.deepEqual(tonality.scale(1), []);
    }
  }
}).export(module);
