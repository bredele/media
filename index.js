
/**
 * Module dependencies.
 * @api private
 */

var Store = require('datastore');


// cross browser getUserMedia

navigator.getMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);


/**
 * Expose 'media'
 */

module.exports = media;


/**
 * media constructor.
 * @api public
 */

function media(obj, success, error) {
  var store = new Store(obj);
  var cb = function(fn, err) {
    navigator.getMedia(store.data, function(stream) {
      var url;
      if (window.URL) url = window.URL.createObjectURL(stream);
      store.once('stop', function() {
        stream.stop();
      });
      fn(stream, url);
    }, error);
  };

  cb.stop = function() {
    // should not stop before capture
    store.emit('stop');
  };

  cb.__proto__ = store;
  if(success) cb(success, error);
  return cb;
}
