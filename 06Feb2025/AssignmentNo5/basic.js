const CallbackFn = function (arr, callback) {
  if (callback === calculateSum) {
    console.log(callback(arr));
  }
  if (callback === filterOut) {
    console.log(callback(arr));
  }
  if (callback === doubleNumbers) {
    console.log(callback(arr));
  }
  if (callback === findMax) {
    console.log(callback(arr));
  }
};

function calculateSum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

function filterOut(arr) {
  return arr.filter((val) => val % 2 == 0);
}

function doubleNumbers(arr) {
  return arr.map((val) => val * 2);
}

function findMax(arr) {
  return arr.reduce((acc, val) => {
    if (acc < val) {
      return val;
    } else {
      return acc;
    }
  }, arr[0]);
}

CallbackFn([30, 46, 23, 78], filterOut);
CallbackFn([30, 46, 23, 78], doubleNumbers);
CallbackFn([30, 46, 23, 78], calculateSum);
CallbackFn([30, 46, 23, 78], findMax);
