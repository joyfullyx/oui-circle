module.exports = {
    // the helper method 'format_time' will take in a timestamp and return a string with only the time
    ifCond: (arg1,arg2, options) => {
        if (arg1 == arg2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
  };
