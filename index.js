'use strict';

var pitch = require('note-pitch');
var intervalo = require('intervalo');

var Tonality = function(note, name) {
  if (!(this instanceof Tonality)) return new Tonality(note, name);

  this.note = note;
  this.name = name;
  this.scaleDef = Tonality.scales[name];
}

Tonality.scales = { major: ["P1","M2","M3","P4","P5","M6","M7"] };

Tonality.prototype.scale = function(grade) {
  return pitch.transpose(this.note, rotate(this.scaleDef, grade - 1));
}

Tonality.prototype.chord = function(grade, numberOfThirds) {
  var scale = rotate(this.scaleDef, grade - 1);
  if(numberOfThirds > 4) {
    scale = scale.concat(scale.map(octave));
  }
  var thirds = scale.filter(function(e, index) {
    return index % 2 == 0 && index < numberOfThirds * 2;
  });
  return pitch.transpose(this.note, thirds);
}

function rotate(intervals, num) {
  var top = intervals.slice(0, num).map(octave);
  return intervals.slice(num, intervals.length).concat(top);
}

function octave(i) {
  i = intervalo(i);
  return i.number(i.number() + 7).toString();
}


module.exports = Tonality;
