media
====

  `getUserMedia` but better.

	
## Installation

with [component](http://github.com/component/component):

	$ component install bredele/media


## Usage

### shim
 
  media is a basic shim for `getUserMedia`. It works on all browsers supporting [webrtc](http://www.webrtc.org/) and automatically creates a blob url from the media stream if supported. 


```js
var media = require('media');
media({
	video: true
}, function(stream, url) {
	// do something with stream or url if exists
});
```

  media also handles errors

```js
media({
	video: true
}, success, function(error) {
	// something went wrong
});
```

  but it does way more than that...

### store

  media is a **[datastore](http://github.com/bredele/datastore)** and allows you to dynamically set/get or listen changes in a media config.

```js
// can be initialize with an optional config object
var video = media();

// set config video
video.set('video', true);
video.disable('audio');

// get video user media
video(function(stream, url) {
  // do something with stream or url if exists
});
```

  The idea is that a media's config should be more than just its constraints (video and audio). 

```js
var video = media({
	video: true
});

video.set('type', 'streaming');
video.set({
	url: 'http://youtu.be/D7EFot_kmS0',
	access: 'admin'
});
```

## Things you should know

### constraints

  By default, media apply the following [constraints](http://src.chromium.org/svn/trunk/src/chrome/test/data/webrtc/manual/constraints.html):

```
{
  "audio": true,
  "video": {
    "mandatory": {},
    "optional": []
  }
}
``` 

  and passing a config (containing the constraints) is optional

```js
var media = require('media');
media(function(stream, url) {
	// do something with stream or url if exists
});
``` 

### listen and start/stop capture

  media is an [emitter](http://github.com/component/emitter) and you can listen changes on a media's config

```js
var media = require('media')();
media.on('change audio', function() {
	// do something
});
media.set('audio', false);
``` 

  or when a media is captured

```js
media.on('capture', function(constraints, stream, ul) {
	// do something
});
media(function(stream, url) {
	// capture stream and render
});
``` 

 or when a media is stopped


```js
media.on('stop', function() {
	// do something on stop
});

media.stop();
``` 
  

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
