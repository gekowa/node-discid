// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length >= targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

function cddbSum(n) {
  var sum = 0;
  n = Math.round(n);
  while (n > 0) {
    sum = sum + (n % 10);
    n = Math.trunc(n / 10);
  }
  return sum;
}

module.exports.calcDiscId = function (tracks /* array of durations in seconds */) {
  // check if is an array
  if (!(typeof tracks === "object" && tracks.hasOwnProperty("length"))) {
    return null;
  }
  // must have at least one track
  if (tracks.length < 1) {
    return null;
  }

  // YYYY
  var i = 0, totalPlayLength = 0, startTime = 2, checkSum = 0;
  for (i = 0; i < tracks.length; i++) {
    // console.log("Start time of track: " + i + " is " + startTime);

    checkSum += cddbSum(Math.trunc(startTime));
    // console.log("CDDB Sum is: " + cddbSum(startTime))
    // console.log("Check sum: " + checkSum);

    startTime += tracks[i];
    totalPlayLength += tracks[i];
  }

  // console.log("Total play length: " + totalPlayLength);
  // console.log("Digit sum of start time: " + checkSum);

  var XX = (checkSum % 255).toString(16);
  XX = XX.padStart(2, "0");
  //   console.log(XX);

  // YYYY
  var YYYY = Math.round(totalPlayLength).toString(16);
  YYYY = YYYY.padStart(4, "0");
  //   console.log(YYYY);

  // ZZ
  ZZ = tracks.length.toString(16);
  ZZ = ZZ.padStart(2, "0");

  return XX + YYYY + ZZ;
};

module.exports.calcDiscIdByOffsets = function (tracks /* offsets in frames */,
  totalPlayLength /* in seconds */) {
  // check if is an array
  if (!(typeof tracks === "object" && tracks.hasOwnProperty("length"))) {
    return null;
  }
  // must have at least one track
  if (tracks.length < 1) {
    return null;
  }
  // first track must be 150
  if (tracks[0] !== 150) {
    return null;
  }

  var FPS = 75;

  var newTracks = [];
  newTracks.length = tracks.length;

  var i;
  for (i = tracks.length - 1; i >= 0; i--) {
    if (i === tracks.length - 1) {
      newTracks[i] = totalPlayLength - tracks[i] / FPS;
    } else {
      newTracks[i] = (tracks[i + 1] - tracks[i]) / FPS;
    }
  }

  return module.exports.calcDiscId(newTracks);
};