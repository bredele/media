media
====

  `getUserMedia` but better.


## Installation

	$ npm install bredele/media --save


## Usage

### shim

`media` is a basic shim for `getUserMedia`. It works on all browsers supporting [webrtc](http://www.webrtc.org/) and automatically creates a blob url from the media stream if supported.


```js
var media = require('media');
media({
	video: true
}, function(stream, url) {
	// do something with stream or url if exists
});
```

### promises

`media` returns a promise to be compliant with thee future API of `getUserMedia`

```js
var media = require('media');
media()
  .then(function(stream) {
    // do something with stream
  })
```

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
