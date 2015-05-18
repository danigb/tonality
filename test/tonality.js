vows = require('vows');
assert = require('assert');

Tonality = require('../');

vows.describe('Tonality').addBatch({
  "major": {
    topic: new Tonality('a', 'major'),

    "scales": function(tonality) {
      assert.deepEqual(tonality.scale(1), "a2 b2 c#3 d3 e3 f#3 g#3".split(' '));
      assert.deepEqual(tonality.scale(2), "b2 c#3 d3 e3 f#3 g#3 a3".split(' '));
    },
    "chords": function(tonality) {
      assert.deepEqual(tonality.chord(1, 3), "a2 c#3 e3".split(' '));
      assert.deepEqual(tonality.chord(1, 4), "a2 c#3 e3 g#3".split(' '));
      assert.deepEqual(tonality.chord(1, 5), "a2 c#3 e3 g#3 b3".split(' '));
      assert.deepEqual(tonality.chord(1, 6), "a2 c#3 e3 g#3 b3 d4".split(' '));
      assert.deepEqual(tonality.chord(1, 7), "a2 c#3 e3 g#3 b3 d4 f#4".split(' '));
    }
  }
}).export(module);
