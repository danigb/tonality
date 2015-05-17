# Tonality

Music tonality in javascript

```js
var Tonality = require('tonality');

tonality = new Tonality('c', 'major');
tonality.scale(1)  // => ['c2', 'd2', 'e2', ...]
tonality.chord(2, { notes: 5 }); // => ['d2', 'f2', 'a2', 'c3', 'e3']
```

__Just testing. This is work in progress__
