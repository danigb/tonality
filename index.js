'use strict';

var pitch = require('note-pitch');
var intervalo = require('intervalo');
var achord = require('achord');

var Tonality = function(note, name) {
  if (!(this instanceof Tonality)) return new Tonality(note, name);

  this.note = note;
  this.name = name;
  this.scaleDef = Tonality.scales[name];
}

Tonality.scales = { major: ["P1","M2","M3","P4","P5","M6","M7"] };

Tonality.prototype.scale = function(grade, opts) {
  var intervals = rotate(this.scaleDef, grade - 1);
  return pitch.transpose(this.note, intervals);
}

Tonality.prototype.chord = function(grade, opts) {
  opts = opts || {};
  opts.thirds = opts.thirds || 4;
  opts.intervals = opts.intervals || false;

  if (grade > this.scaleDef.length) {
    throw Error("Invalid grade: " + grade)
  }
  var scale = rotate(this.scaleDef, grade - 1);

  if(opts.thirds > 4) {
    scale = scale.concat(scale.map(octave));
  }
  var thirds = scale.filter(function(e, index) {
    return index % 2 == 0 && index < opts.thirds * 2;
  });
  return opts.intervals ? thirds : pitch.transpose(this.note, thirds);
}

var GRADES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
Tonality.prototype.chordName = function (grade) {
  var intervals = this.chord(grade, { intervals: true });
  return GRADES[grade - 1] + achord(intervals);
};

function rotate(intervals, num) {
  var top = intervals.slice(0, num).map(octave);
  return intervals.slice(num, intervals.length).concat(top);
}

function octave(i) {
  i = intervalo(i);
  return i.number(i.number() + 7).toString();
}


module.exports = Tonality;
