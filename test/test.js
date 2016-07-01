/**
 * Test dependencies.
 */

var media = require('..')

var el1 = document.querySelector('.video1');
var el2 = document.querySelector('.video2');

media()
  .then(function(stream) {
    var url
    if (window.URL) url = window.URL.createObjectURL(stream)
    el1.src = url
  })


media(null, function(stream, url) {
  el2.src = url;
})
