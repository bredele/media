
/**
 * Shim
 */

navigator.getMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia)


/**
 * Default constraints.
 */

var constraints =  {
  "audio": true,
  "video": {
    "mandatory": {},
    "optional": []
  },
  "autoplay": true
}


/**
 * Get user media.
 *
 * @param  {Object} options (aka constraints)
 * @param  {Function} success
 * @param  {Function} error
 * @return {Promise}
 * @api private
 */
module.exports = function(options, success, error) {
  return new Promise(function (fulfill, reject) {
    navigator.getMedia(options || constraints, function(stream) {
      success && success(stream)
      fulfill(stream)
    }, function(err) {
      error && error(err)
      reject(err)
    });
  })
}
