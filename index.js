
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
  return new Promise(function (fulfill, reject){
    navigator.getMedia(data, function(stream) {
      var url
      if (window.URL) url = window.URL.createObjectURL(stream)
      fulfill(stream, url)
    }, function(err) {
      error(err)
      reject(err)
    });
  })
}
