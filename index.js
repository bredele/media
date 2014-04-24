
/**
 * Module dependencies.
 * @api private
 */

var Store = require('datastore');
var wedge = require('wedge');
var deus = require('deus');

// cross browser getUserMedia

navigator.getMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

// default constraints

var constraints =  {
  "audio": true,
  "video": {
    "mandatory": {},
    "optional": []
  }
};


/**
 * Expose 'media'
 */

module.exports = deus('object', 'function', media);

/**
 * media constructor.
 *
 * A media is a function with a datastore
 * as prototype.
 *
 * @param {Object} obj (optional)
 * @param {Function} success (optional)
 * @param {Function} error (optional)
 * @return {Function}
 * @api public
 */

function media(obj, success, error) {

  // intialize media's config
  
  var store = new Store(constraints);
  store.set(obj);

  /**
   * [cb description]
   * @param  {Function} fn  [description]
   * @param  {[type]}   err [description]
   * @return {Function}     [description]
   */
  
  var cb = function(fn, err) {
    var data = wedge(store.data, 'video', 'audio');
    navigator.getMedia(data, function(stream) {
      var url;
      if (window.URL) url = window.URL.createObjectURL(stream);
      store.once('stop', function() {
        stream.stop();
      });
      fn(stream, url);
      store.emit('capture', stream, url);
    }, error);
  };

  /**
   * stop capture.
   * @api public
   */
  
  cb.stop = function() {
    store.emit('stop');
    return cb;
  };

  // set media's prototype

  cb.__proto__ = store;

  if(success) cb(success, error);

  return cb;
}
