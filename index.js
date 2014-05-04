
/**
 * Module dependencies.
 * @api private
 */

var Store = require('datastore');
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

module.exports = Media;


/**
 * Media factory.
 *
 * Examples:
 *
 *  media();
 *  media(obj, success);
 *  media(success);
 * 
 * @param  {Object} obj    
 * @param  {Function} success 
 * @param  {Function} error 
 * @return {Media}
 * @api private
 */

var factory = deus('object', 'function', function(obj, success, error) {
  var media = new Media(obj);
  if(error) media.on('error', error);
  if(success) media.capture(success);
  return media;
});


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

function Media(obj, success, error) {
  if(!(this instanceof Media)) {
    return factory.apply(null, arguments);
  }
  Store.call(this);
  this.use(toggle);
  this.set(constraints);
  this.set(obj);
}


// Media is a datastore

Media.prototype = Store.prototype;


/**
 * Capture media and emit stream
 * event.
 *
 * Capture is call automatically by constructor when
 * a success callbacl is specified. 
 *
 * Examples:
 *
 *   media.capture();
 *   media.capture(function(stream, url) {
 *     // do something with string
 *   });
 * 
 * @param  {Function} cb (optional)
 * @return {this}
 * @api public
 */

Media.prototype.capture = function(cb) {
  var data = wedge(this.data, 'video', 'audio');
  var _this = this;
  navigator.getMedia(data, function(stream) {
    var url;
    if (window.URL) url = window.URL.createObjectURL(stream);
    _this.once('stop', function() {
      stream.stop();
    });
    _this.emit('stream', data, stream, url);
    if(cb) cb(stream, url);
  }, function(error) {
    _this.emit('error', error);
  });
  return this;
};


/**
 * Stop captured media.
 * 
 * @return {this}
 * @api public
 */

Media.prototype.stop = function() {
  this.emit('stop');
  return this;
};
