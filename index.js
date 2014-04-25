
/**
 * Module dependencies.
 * @api private
 */

Store = require('datastore');
var wedge = require('wedge');
var deus = require('deus');
var toggle = require('store-toggle');

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
  },
  "autoplay": true
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
  
  var store = new Store();
  store.use(toggle);
  store.set(constraints);
  store.set(obj);

  /**
   * Get user media and create blob url.
   * 
   * @param  {Function} fn  
   * @param  {Function}   err 
   * @api private
   */
  
  var cb = function(fn, err) {
    var data = wedge(cb.data, 'video', 'audio');
    navigator.getMedia(data, function(stream) {
      var url;
      if (window.URL) url = window.URL.createObjectURL(stream);
      cb.once('stop', function() {
        stream.stop();
      });
      fn(stream, url);
      cb.emit('capture', data, stream, url);
    }, error);
  };

  /**
   * stop capture.
   * @api public
   */
  
  cb.stop = function() {
    cb.emit('stop');
    return cb;
  };

  // set media's prototype

  cb.__proto__ = store;

  if(success) cb(success, error);

  return cb;
}
