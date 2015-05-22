'use strict';

var pitch = require('note-pitch');
var Interval = require('interval-parser');
var achord = require('achord');

var Tonality = function(note, name) {
  if (!(this instanceof Tonality)) return new Tonality(note, name);

  this.note = note;
  this.name = name;
  this.scaleDef = Tonality.scales[name];
}

Tonality.scales = { major: ["P1","M2","M3","P4","P5","M6","M7"] };

Tonality.prototype.scale = function(grade, opts) {
  grade = gradeNum(grade);
  var intervals = rotate(this.scaleDef, grade - 1);
  return pitch.transpose(this.note, intervals);
}

Tonality.prototype.chord = function(grade, opts) {
  opts = opts || {};
  opts.notes = opts.notes || 4;

  grade = gradeNum(grade);
  var scale = rotate(this.scaleDef, grade - 1);

  if(opts.notes > 4) {
    scale = scale.concat(scale.map(octaveInterval));
  }
  var thirds = scale.filter(function(e, index) {
    return index % 2 == 0 && index < opts.notes * 2;
  });
  return pitch.transpose(this.note, thirds);
}

var GRADES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
Tonality.prototype.chordName = function (grade) {
  grade = gradeNum(grade);
  var root = this.scale(grade)[0];
  var chord = this.chord(grade);
  var intervals = pitch.distance(root, chord);
  return GRADES[grade - 1] + achord(intervals);
};

function gradeNum(grade) {
  if (grade < 1 || grade > 7) {
    throw Error("Grade must be between 1 and 7: " + grade)
  }
  return grade;
}

function rotate(intervals, num) {
  var top = intervals.slice(0, num).map(octaveInterval);
  return intervals.slice(num, intervals.length).concat(top);
}

function octaveInterval(i) {
  i = Interval(i);
  return i.quality + (i.number + 7);
}


module.exports = Tonality;
