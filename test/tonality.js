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
      assert.deepEqual(tonality.chord(1), ['a2', 'c#3', 'e3', 'g#3']);
      assert.deepEqual(tonality.chord(2), ['b2', 'd3', 'f#3', 'a3']);
      assert.deepEqual(tonality.chord(3), ['c#3', 'e3', 'g#3', 'b3']);
      assert.deepEqual(tonality.chord(4), ['d3', 'f#3', 'a3', 'c#4']);
      assert.deepEqual(tonality.chord(5), ['e3', 'g#3', 'b3', 'd4']);
      assert.deepEqual(tonality.chord(6), ['f#3', 'a3', 'c#4', 'e4']);
      assert.deepEqual(tonality.chord(7), ['g#3', 'b3', 'd4', 'f#4']);
      assert.deepEqual(tonality.chord(8), ['a2', 'c#3', 'e3', 'g#3']);
    },
    "chords lengths": function(tonality) {
      assert.deepEqual(tonality.chord(1), "a2 c#3 e3 g#3".split(' '));
      assert.deepEqual(tonality.chord(1, {thirds: 3}), "a2 c#3 e3".split(' '));
      assert.deepEqual(tonality.chord(1, { thirds: 4 }), "a2 c#3 e3 g#3".split(' '));
      assert.deepEqual(tonality.chord(1, { thirds: 5 }), "a2 c#3 e3 g#3 b3".split(' '));
      assert.deepEqual(tonality.chord(1, { thirds: 6 }), "a2 c#3 e3 g#3 b3 d4".split(' '));
      assert.deepEqual(tonality.chord(1, { thirds: 7 }), "a2 c#3 e3 g#3 b3 d4 f#4".split(' '));
    },
    "chord thirds": function(tonality) {
      assert.equal(tonality.chordName(1), "IMaj7");
      assert.equal(tonality.chordName(2), "IIm7");
    }
  }
}).export(module);
