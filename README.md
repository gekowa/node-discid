# Calculates CDDB1 (FreeDB) disc ID 

[![Build Status](https://api.travis-ci.com/gekowa/node-discid.svg?branch=master)](https://travis-ci.com/gekowa/node-discid/)

A package that calculates CDDB1 style disc ID, the 8 digit disc ID.

## Install
```bash
npm install node-discid
```

## Usage

```javascript
const { calcDiscId, calcDiscIdByOffsets } = require("node-discid");

calcDiscId([549.77,934.83,762.79,519.61]);  // returns "310acf04"
calcDiscIdByOffsets([150,41383,111495,168704], 2769);   // returns "310acf04"
```

## API

### `calcDiscId (tracks) `
Accepts an array of duration in seconds of each tracks, returns the disc ID as
string.


### `calcDiscIdByOffsets (offsets, totalLength) `
Accepts an array of offsets in frames, and a total playback duration in seconds,
returns the disc ID as string.
