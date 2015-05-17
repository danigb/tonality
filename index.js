'use strict';

var altura = require('./lib/tonalto.js')
var scaler = require('scaler');

var Tonality = function(note, name) {
  if (!(this instanceof Tonality)) return new Tonality(note, name);

  this.note = tonalto(note);
  this.name = name;
  this.scale = scale(note, Tonality.scales[name]);
}

Tonality.scales = { major: ["P1","M2","M3","P4","P5","M6","M7"] };


module.exports = Tonality;
