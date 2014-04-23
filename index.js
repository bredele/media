
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

function media(obj) {
  var store = new Store(obj);
  var cb = function(success, error) {
    navigator.getMedia(store.data, function(stream) {
      var url;
      if (window.URL) url = window.URL.createObjectURL(stream);
      success(stream, url);
    }, error);
  };
  cb.__proto__ = store;
  return cb;
}
