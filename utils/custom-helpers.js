// error handling for the routes
const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// custom error handlers
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  catchErrors,
  sleep,
};
